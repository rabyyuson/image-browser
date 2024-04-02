"use client";

import { useEffect, useState } from "react";
import { Photo } from "@/lib/types/types";
import config from "@/config.json";
import SearchBar from "@/components/photos/search-bar";
import Link from "next/link";
import clsx from "clsx";

export default function Search({
    params,
    onSearchChange,
}: {
    params: {
        id: string;
    };
    onSearchChange: (query: string, orderBy: string) => Promise<Photo>;
}) {
    const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
    const [selectedOrderBy, setSelectedOrderBy] = useState(config.unsplash_api.photos.search.order_by[0]);

    const { id } = params;

    useEffect(() => {
        async function fetchPhotos() {
            const photos = await onSearchChange(id, config.unsplash_api.photos.search.order_by[0]);
            setFilteredPhotos(photos.results);
        }
        fetchPhotos();
    }, []);

    return (
        <div>
            <SearchBar id={id} />
            <div className="flex flex-row gap-5 mb-5">
                {config.unsplash_api.photos.search.order_by.map((orderBy, index) => (
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

                                const photos = await onSearchChange(id, orderBy);
                                setFilteredPhotos(photos.results);
                            }}
                        />
                        <label
                            htmlFor={orderBy} 
                            className={clsx(
                                selectedOrderBy === orderBy && "bg-blue-700 text-white",
                                "flex flex-row gap-2 px-2 py-1 border border-black cursor-pointer",
                            )}
                        >
                            {orderBy.charAt(0).toUpperCase()}{orderBy.slice(1,orderBy.length)}
                        </label>
                    </div>
                ))}
            </div>
            <ul className="grid grid-cols-2 gap-5 md:grid-cols-3">
                {filteredPhotos.map(photo => (
                    <li key={photo.id}>
                        <Link href={`/photos/${photo.id}`}>
                            <img src={photo.urls.small} className="rounded-lg" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
