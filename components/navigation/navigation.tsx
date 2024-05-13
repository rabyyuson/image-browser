"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import SearchBar from "@/components/photos/search-bar";
import config from "@/config.json";
import clsx from "clsx";

export default function Navigation() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 p-5 rounded-md bg-gray-900 mb-3">
            <ul className="flex flex-row mr-2 gap-2">
                {config.navigation.map((navigation, index) => (
                    <li key={index}>
                        <Link
                            href={navigation.url}
                            className={clsx(
                                "text-white rounded-md flex font-semibold text-sm px-4 py-2",
                                pathname === navigation.url
                                    ? "bg-lime-600"
                                    : "bg-lime-800",
                            )}
                        >
                            {navigation.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <SearchBar id="" />
        </div>
    );
}