"use client";

import { useState } from "react";
import { Photo } from "@/lib/types/types";
import config from "@/config.json";

export default function Photos({
    photos,
    onFilterChange,
}: {
    photos: Photo[];
    onFilterChange: (orderBy: string) => Promise<Photo[]>;
}) {
    const [filteredPhotos, setFilteredPhotos] = useState(photos);

    return (
        <div className="container mx-auto">
            <select
                className="border border-black px-2 py-1 my-5"
                onChange={async (event) => {
                    const orderBy = event.target.value;
                    const photos = await onFilterChange(orderBy);

                    setFilteredPhotos(photos);
                }}
            >
                {config.photos.list.order_by.map((orderBy, index) => (
                    <option key={index} value={orderBy}>{orderBy.charAt(0).toUpperCase()}{orderBy.slice(1,orderBy.length)}</option>
                ))}
            </select>
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
