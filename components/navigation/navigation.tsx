import Link from "next/link";
import config from "@/config.json";

export default function Navigation() {
    return (
        <ul className="mb-5 flex flex-row gap-2">
            {config.navigation.map((navigation, index) => (
                <li key={index}>
                    <Link
                        href={navigation.url}
                        className="text-blue-700 underline"
                    >
                        {navigation.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
}