"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({
    id,
}: {
    id: string;
}) {
    const [searchText, setSearchText] = useState(id);

    const router = useRouter();

    return (
        <form
            className="flex flex-row gap-1"
            onSubmit={async (event) => {
                event.preventDefault();
                router.push(`/search/${searchText}`);
            }}
        >
            <input
                className="border border-black px-2 py-1 mb-5"
                type="text"
                placeholder="Look up photos..."
                value={decodeURI(searchText)}
                required
                onChange={(event) => { setSearchText(event.target.value) }}
            />
            <button
                type="submit"
                className="border border-black px-2 py-1 mb-5 hover:bg-blue-700 hover:text-white"
            >
                Search
            </button>
        </form>
    );
}
