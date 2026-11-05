import React,{useRef} from 'react'
import { HardDriveIcon, UsersIcon, Trash2Icon, PlusIcon, FolderPlusIcon } from 'lucide-react'
import{useApp} from '../../context/AppContext'
import{useLocation} from 'react-router-dom'
import { ItemDropdown } from '../ui/ItemDropdown'
import { Dropdown, DropdownItem } from '../ui/Dropdown'

const Sidebar = ({onCreateFolderClick,isMobileOpen,setIsMobileOpen}) => {
    const{user,currentFolderId}=useApp()
    const isUploading=false
    const location=useLocation()
    const fileInputRef=useRef(null)
    const storage_used=Number(user?.storage_used ?? 0);
    const storage_limit=Number(user?.storage_limit ?? 1073741824);//1GB
    const use_percentage=Math.min(100,Math.round((storage_used/storage_limit)*100))
    const navItems=[
      {label:"My Drive", path:"/",icon:HardDriveIcon},
      {label:"Shared Files", path:"/shared",icon:UsersIcon},
      {label:"Trash", path:"/",icon:Trash2Icon},
      
    ]
  return (
    <>
       {/* Mobile overlay backdrop */}
       {
        isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs md:hidden" onClick={()=> setIsMobileOpen(false)}/>

        
       )}
       <aside className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 md:translate-x-0 ${isMobileOpen? "translate-x-0":"-translate-x-full"}`}>
          {/* Brand logo Header */}
          <div className='flex items-center gap-3 px-6 py-5 border-b border-slate-200'>
            <img src="/logo.svg" alt="logo" className='size-11'/>
            <div>
              <h1 className="text-2xl font-medium uppercase text-slate-800">Drivea</h1>
              <p className="text-sm text-slate-500 tracking-wider font-medium">Cloud Storage</p>
            </div>
          </div>
          {/* upload CTA Dropdown */}
          <div className='p-4'>
             <input type="file" ref={fileInputRef} className="hidden" />
             <Dropdown
             trigger={
              <button type="button" disabled={isUploading} className="w-full flex items-center justify-center gap-2 px-4 py-3
              bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-lg transition-all disabled:opacity-50 cursor-pointer">
                <PlusIcon className='size-5'/>
                <span>New Item</span>
              </button>
             }
               align="left"
               className="w-32"
             >
               
               <DropdownItem icon={HardDriveIcon} onClick={()=>fileInputRef.current?.click()}> Upload File</DropdownItem>
               <DropdownItem icon={FolderPlusIcon}  onClick={onCreateFolderClick}> New Folder</DropdownItem>
             </Dropdown>
          </div>
          {/* Navigation Links */}
          <nav>
            <p>links</p>
          </nav>
          {/* storage usage widget */}
          <div>
            <p>Storage usage</p>
          </div>
       </aside>
    </>
  )
}

export default Sidebar