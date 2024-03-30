"use client";

import { useState } from "react";
import { Photo } from "@/lib/types/types";
import config from "@/config.json";

export default function Photos({
    photos,
    onOrderByChange,
    onSearchChange,
}: {
    photos: Photo[];
    onOrderByChange: (orderBy: string) => Promise<Photo[]>;
    onSearchChange: (query: string) => Promise<Photo>;
}) {
    const [searchText, setSearchText] = useState("");
    const [filteredPhotos, setFilteredPhotos] = useState(photos);

    return (
        <div className="container mx-auto my-10">
            <div className="flex flex-row">
                <input
                    className="border border-black px-2 py-1 mb-5"
                    type="text"
                    placeholder="Search a photo..."
                    value={searchText}
                    onChange={(event) => { setSearchText(event.target.value) }}
                />
                <button
                    className="border border-black px-2 py-1 mb-5"
                    onClick={async () => {
                        const photos = await onSearchChange(searchText);
                        setFilteredPhotos(photos?.results ?? []);
                    }}
                >Search</button>
            </div>
            <div className="flex flex-row justify-start">
                <div>
                    <select
                        className="border border-black px-2 py-1 mb-5"
                        onChange={async (event) => {
                            const orderBy = event.target.value;
                            const photos = await onOrderByChange(orderBy);

                            setFilteredPhotos(photos);
                        }}
                    >
                        {config.photos.list.order_by.map((orderBy, index) => (
                            <option key={index} value={orderBy}>
                                {orderBy.charAt(0).toUpperCase()}{orderBy.slice(1,orderBy.length)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <ul className="grid grid-cols-4 gap-10">
                {filteredPhotos.map(photo => (
                    <li key={photo.id}>
                        <img src={photo.urls.small} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
