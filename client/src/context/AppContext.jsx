// import{createContext} from "react";
// const AppContext=createContext()
// const getErrMsg=(err,fallback)=> err.response?.data?.error || fallback
// export const AppProvider=({children})=>{
//     const[user,setUser]=useState(null)
//     //auth action helper
//     const authAction= async(GitPullRequestDraftIcon,successMsg,errorFallback)=>{
//         try{
//             const{data}= await requestFn();
//             setUser(data.user)
//             if(successMsg) toast.success(successMsg)
//                 return true;
//         } catch(error){
//            toast.error(getErrMsg(error, errorFallback))
//            return false
//         }
//     }
//         const login=(email,password)=>{
//             return authAction(()=>api.post("/api/auth/login",{email,password}),"Welcome back!","Invalid email or password")

//         }
//                 const register=(name,email,password)=>{
//             return authAction(()=>api.post("/api/auth/register",{name,email,password}),"Registration successful!","Invalid email or password")

//         }
//         const logout=()=>{
//             try
// {
//                 api.post("/api/auth/logout")
//                 setUser(null)
//                 toast.success("Logged out successfully!")
//             }
//             catch(error){
//                 toast.error(getErrMsg(error, "Failed to log out"))
//             }
//         }

//         const value={
//             user,setUser,login,register,logout
//         }
//        return <AppContext.Provider value={{}}>
//             {children}
//         </AppContext.Provider>
// }
// export const useApp=()=> useContext(AppContext)
import { createContext, useContext, useEffect, useState ,useCallback} from "react";
import toast from "react-hot-toast";
import api from "../config/api.js";

const AppContext = createContext();

const getErrMsg = (err, fallback) => err.response?.data?.error || fallback;

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const[isLoading, setIsLoading]=useState(true)
  //Refresh user profile and storage stats
  const refreshUser=useCallback(async()=>{
    try {
        const{data}=await api.get(".api/auth/me");
        setUser(data.user)
        return data.user;
    } catch (error) {
        setUser(null)
        return null;
        
    }
  },[])
  //chech auth status on app load
  useEffect(()=>{
    refreshUser().finally(()=>setIsLoading(false))
  },[refreshUser])

  // auth action helper
  const authAction = async (requestFn, successMsg, errorFallback) => {
    try {
      const { data } = await requestFn();
      setUser(data.user);
      if (successMsg) toast.success(successMsg);
      return true;
    } catch (error) {
      toast.error(getErrMsg(error, errorFallback));
      return false;
    }
  };

  const login = (email, password) => {
    return authAction(
      () => api.post("/api/auth/login", { email, password },),
      "Welcome back!",
      "Invalid email or password",
    );
  };

  const register = (name, email, password) => {
    return authAction(
      () => api.post("/api/auth/register", { name, email, password }),
      "Registration successful!",
      "Invalid email or password",
    );
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(getErrMsg(error, "Failed to log out"));
    }
  };

  const value = {
    user,
    setUser,
    login,
    register,
    logout,isLoading,isAuthenticated:!!user,refreshUser
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);