import './bootstrap';
import '../css/app.css'

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <>
                <App {...props} />
                <ToastContainer position="top-right" autoClose={3000} />
            </>
        );
    },
});