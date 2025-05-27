import React from "react";
import { Bell } from "lucide-react";

const Navbar = ({children}) => {
    return (
        <div className="w-full h-20 px-8 py-6 shadow-lg flex items-center justify-between bg-neutral-100">
            <span className="text-xl">☀️ Good morning, {children}!</span>

            <div className="w-10 h-10 mr-4 flex items-center justify-center rounded-md bg-neutral-100 hover:bg-neutral-200 border border-neutral-300">
                <Bell size={20} />
            </div>
        </div>
    );
}

export default Navbar