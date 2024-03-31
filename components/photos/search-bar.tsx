"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ id }: { id: string; }) {
    const [searchText, setSearchText] = useState(id);

    const router = useRouter();

    return (
        <form 
            onSubmit={async (event) => {
                event.preventDefault();
                router.push(`/photos/${searchText}`);
            }}
        >
            <input
                className="border border-black px-2 py-1 mb-5"
                type="text"
                placeholder="Search a photo..."
                value={decodeURI(searchText)}
                required
                onChange={(event) => { setSearchText(event.target.value) }}
            />
            <button
                type="submit"
                className="border border-black px-2 py-1 mb-5"
            >
                Search
            </button>
        </form>
    );
}
