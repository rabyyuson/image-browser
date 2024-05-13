import Link from "next/link";
import SearchBar from "@/components/photos/search-bar";
import config from "@/config.json";

export default function Navigation() {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 p-5 rounded-md bg-gray-900">
            <SearchBar id="" />
            <ul className="flex flex-row ml-2 gap-2">
                {config.navigation.map((navigation, index) => (
                    <li key={index}>
                        <Link
                            href={navigation.url}
                            className="bg-indigo-700 text-white rounded-md flex font-semibold text-sm px-4 py-2 hover:bg-indigo-600"
                        >
                            {navigation.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}