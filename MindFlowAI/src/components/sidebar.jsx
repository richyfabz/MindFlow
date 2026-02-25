import React from "react";
import { MessageSquare, Plus, Trash } from "lucide-react";

function Sidebar() {
    return <div className={'w-64 transition-all duration-300 flex flex-col overflow-hidden'}>
        {/**  new chat botton */}
        <div className="p-3">
            <button className={'w-full flex items-center gap-3 p-3 rounded-lg border transition-all'}>
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">New chat</span>
            </button>
        </div>


        {/**Conversations list */}
        <div className="flex-1 overflow-y-auto px-3">
            {/**condition rendering */}
            <div className={'text-center p-4 text-sm'}>
                No conversations yet. Start a new chat!
            </div>
            {/**Else i will use map method */}
            <div className={'group flex item-center gap-3 p-3 rounded-lg cursor-pointer transition-all mb-1'}>
                <MessageSquare className="w-4 h-4 flex-shrink-0"/>
                <span className="text-sm flex-1 truncate">Conversation title</span>
                <button className={'opacity-0 group-hover:opacity-100 p-1 rounded transition-opacity'}>
                    <Trash className="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
}

export default Sidebar;