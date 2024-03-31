"use client";

import { useEffect, useState } from "react";
import { Photo } from "@/lib/types/types";
import config from "@/config.json";
import SearchBar from "@/components/photos/search-bar";
import clsx from "clsx";

export default function Photos({
    onOrderByChange,
}: {
    onOrderByChange: (orderBy: string) => Promise<Photo[]>;
}) {
    const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
    const [selectedOrderBy, setSelectedOrderBy] = useState(config.photos.list.order_by[0]);

    useEffect(() => {
        async function fetchPhotos() {
            const photos = await onOrderByChange(config.photos.list.order_by[0]);
            setFilteredPhotos(photos);
        }
        fetchPhotos();
    }, []);

    return (
        <div className="container mx-auto my-10">
            <div className="flex flex-row">
                <SearchBar id="" />
            </div>
            <div className="flex flex-row gap-5 items-center justify-center mb-10">
                {config.photos.list.order_by.map((orderBy, index) => (
                    <div
                        key={index}
                        className="flex flex-row gap-2"
                    >
                        <input
                            className="hidden"
                            id={orderBy}
                            type="radio"
                            name="filter"
                            key={index}
                            value={orderBy}
                            onChange={async (event) => {
                                const orderBy = event.target.value;
                                setSelectedOrderBy(orderBy);

                                const photos = await onOrderByChange(orderBy);
                                setFilteredPhotos(photos);
                            }}
                        />
                        <label
                            htmlFor={orderBy} 
                            className={clsx(
                                selectedOrderBy === orderBy && "bg-purple-700 text-white",
                                "flex flex-row gap-2 px-5 py-2 border border-black cursor-pointer",
                            )}
                        >
                            {orderBy.charAt(0).toUpperCase()}{orderBy.slice(1,orderBy.length)}
                        </label>
                    </div>
                ))}
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
