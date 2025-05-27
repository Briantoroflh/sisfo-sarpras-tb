import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({children}) => {
    return (
        <>
            <Sidebar>
                <Navbar>Zetoonik</Navbar>
                {children}
            </Sidebar>
        </>
    );
}

export default DashboardLayout;