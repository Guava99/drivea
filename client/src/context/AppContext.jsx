import{createContext} from "react";
const AppContext=createContext()
export const AppProvider=({children})=>{
    const[user,setUser]=useState(null)
    //auth action helper
    const authAction= async(GitPullRequestDraftIcon,successMsg,errorFallback)=>{
        try{
            const{data}= await requestFn();
        } catch(error){

        }
    }
        const login=(email,password)=>{
            return
        }
        const value={}
       return <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
}
export const useApp=()=> useContext(AppContext)