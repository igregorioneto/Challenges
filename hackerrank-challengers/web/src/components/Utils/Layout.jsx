import icons from "@/src/shared/icons";
import Link from "next/link";
import { useState } from "react";

const Layout = ({ children }) => {
    const [title, setTitle] = useState("");

    const initialMenu = [
        { id: 1, title: "Code Review", path: "/code-review", icon: "code-review-icon" },
        { id: 2, title: "Article Sorting", path: "/article-sorting", icon: "article-sorting-icon" },
        { id: 3, title: "Contact-Form", path: "/contact-form", icon: "contact-form-icon" },
        { id: 4, title: "Patient Medical Records", path: "/patient-medical-records", icon: "patient-medical-records-icon" },
        { id: 5, title: "Bloc Post", path: "/blog-post", icon: "blog-post-icon" },
        { id: 6, title: "Slide Show", path: "/slide-show", icon: "slide-show-icon" },
        { id: 7, title: "Employee Validation", path: "/employee-validation", icon: "employee-validation-icon" },
        { id: 8, title: "Word Omitter", path: "/word-omitter", icon: "word-omitter-icon" },
    ];

    const handleTitle = (menuId) => {
        const menu = initialMenu.find((menu) => menu.id === menuId);
        if (menu) {
            setTitle(menu.title);
            return;
        }
        console.error("Title not found in Menu");
        return;
    }

    return (
    <>
        <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
            <div class="flex items-center justify-start rtl:justify-end">
                <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span class="sr-only">Open sidebar</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>
                <Link href="/" passHref class="flex ms-2 md:me-24">
                    <svg class="w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                    </svg>
                    <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Home</span>
                </Link>
                <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">{title || null}</span>
            </div>
            </div>
        </div>
        </nav>

        <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul class="space-y-2 font-medium">             
                {initialMenu.map((item) => (
                    <li key={item.id} onClick={() => handleTitle(item.id)}>
                        <Link href={item.path} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            {icons[item.icon] || null}
                            <span class="flex-1 ms-3 whitespace-nowrap">{item.title}</span>
                        </Link>
                    </li> 
                ))}      
            </ul>
        </div>
        </aside>

        <div class="p-4 sm:ml-64">
        <div class="p-16">
            {children}
        </div>
        </div>
    </>
    
    );
}

export default Layout;