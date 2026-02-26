import React from "react";
import { MessageSquare, Plus, Trash2, User } from "lucide-react";

function Sidebar() {
    return (
        <div className="w-64 transition-all duration-300 flex flex-col overflow-hidden bg-gray-950 text-white border-r border-gray-800 h-screen">
            
            {/* New chat button */}
            <div className="p-3">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition-all">
                    <Plus className="w-4 h-4" />
                    <span className="text-sm font-medium">New chat</span>
                </button>
            </div>

            {/* Conversations list */}
            <div className="flex-1 overflow-y-auto px-3">
                <div className="text-center p-4 text-sm text-gray-400">
                    No conversations yet. Start a new chat!
                </div>

                <div className="group flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-800 transition-all mb-1">
                    <MessageSquare className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm flex-1 truncate">Conversation title</span>
                    <button className="opacity-0 group-hover:opacity-100 p-1 rounded transition-opacity hover:bg-gray-700">
                        <Trash2 className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Footer - outside scroll area so it sticks to bottom */}
            <div className="p-3 border-t border-gray-800">
                <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-all text-sm mb-2">
                    <Trash2 className="w-4 h-4" />
                    <span>Clear all conversations</span>
                </button>
                <div className="flex items-center gap-3 p-2 rounded-lg border border-gray-700 mt-1">
                    <User className="w-4 h-4" />
                    <span className="text-sm">User</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;