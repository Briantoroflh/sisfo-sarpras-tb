import React from "react";
import { Link } from "@inertiajs/react";

const SidebarItem = ({ icon, text, href, onClick}) => {
    const isActive = window.location.pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={
                `flex mt-4 items-center p-3 rounded-md cursor-pointer hover:outline-2 hover:outline-neutral-300 hover:scale-110 hover:shadow-lg ${
                    isActive ? "outline-2 outline-neutral-300 scale-110 shadow-lg" : ""
                }`
            }
        >
            <div className="mx-1">{icon}</div>
            <span className="text-lg font-medium">{text}</span>
        </Link>
    );
}

export default SidebarItem;