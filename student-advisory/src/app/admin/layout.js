import Header  from "@/components/header";
import Sidebar from "@/components/sidebarAdmin";

export default function AdminLayout({children}){
    return(
        
                <div className="flex h-screen overflow-hidden">
                    {/* untuk sidebar */}
                    <Sidebar/>
                    {/* untuk container for content */}
                    <div className="flex flex-col flex-1 overflow-auto">
                        {/* kandungan yang ada pada body */}
                        <div className="max-w-7xl mx-auto w-full">
                            <Header/>
                            <main>{children}</main>
                        </div>

                    </div>
                </div>
            
    )
}