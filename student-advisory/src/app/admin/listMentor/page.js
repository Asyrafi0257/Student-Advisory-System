"use client"

import ListMentor from "@/components/listMentor"

export default function Mentor(){
    return(
        <div className="flex-1 overflow-auto relative z-10">
            <main  className="max-w-7xl m-auto py:4 lg:px-8">
                <ListMentor/>
            </main>
        </div>
    )
}