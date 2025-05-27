import React from "react";
import SidebarItem from "./Sidebar-item";
import {
    LayoutDashboard,
    Users,
    LibraryBig,
    Package2,
    CircleArrowUp,
    CircleArrowDown,
    LogOut,
} from "lucide-react";
import axios from "axios";

const Sidebar = ({ children }) => {
    const token = localStorage.getItem("token");

    const logout = async () => {
        await axios({
            method: "DELETE",
            url: "http://127.0.0.1:8000/api/logout/{id}",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            }
        }).then((response) => {

        });
    }

    return (
        <div className="flex h-screen">
            {/* sidebar */}
            <div className="fixed top-0 left-0 w-60 h-screen bg-stone-50 outline-2 outline-offset-0 outline-neutral-300 z-10">
                <div className="py-4 px-15 flex outline-2 outline-offset-0 outline-neutral-300">
                    <img
                        src="/img/logonotext-nobg-zetoonik.png"
                        className="w-6 h-10"
                        alt=""
                    />
                    <span className="mx-2 py-2 font-medium text-lg">
                        Zetoonik
                    </span>
                </div>
                <div className="p-6">
                    <SidebarItem
                        icon={<LayoutDashboard size={20} />}
                        text={"Dashboard"}
                        href={"/dashboard"}
                    />
                    <SidebarItem
                        icon={<Users size={20} />}
                        text={"Pengguna"}
                        href={"/user"}
                    />
                    <SidebarItem
                        icon={<LibraryBig size={20} />}
                        text={"Kategori"}
                        href={"/category-items"}
                    />
                    <SidebarItem
                        icon={<Package2 size={20} />}
                        text={"Barang"}
                        href={"/items"}
                    />
                    <SidebarItem
                        icon={<CircleArrowUp size={20} />}
                        text={"Peminjaman"}
                        href={"/borrowed-items"}
                    />
                    <SidebarItem
                        icon={<CircleArrowDown size={20} />}
                        text={"Harinegro"}
                        href={"/return-items"}
                    />
                    <div className="mt-8 text-red-700">
                        <SidebarItem
                            icon={<LogOut size={20} />}
                            text={"Logout"}
                        />
                    </div>
                </div>
            </div>

            {/* main content */}
            <main className="pl-60 w-full h-screen overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default Sidebar;
