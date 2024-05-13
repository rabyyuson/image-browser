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
            onSubmit={async (event) => {
                event.preventDefault();
                router.push(`/search/${searchText}`);
            }}
        >
            <div className="flex flex-row gap-2 sm:border-r-[1px] border-gray-700 pr-4">
                <input
                    className="rounded-md text-sm px-3 md:min-w-80"
                    type="text"
                    placeholder="Look up photos..."
                    value={decodeURI(searchText)}
                    required
                    onChange={(event) => { setSearchText(event.target.value) }}
                />
                <button
                    type="submit"
                    className="bg-gray-700 text-white rounded-md flex font-semibold text-sm px-4 py-2 hover:bg-gray-600"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
