"use client";

import { useEffect, useState } from "react";
import { Photo } from "@/lib/types/types";
import SearchBar from "@/components/photos/search-bar";

export default function Search({
    params,
    onSearchChange,
}: {
    params: { id: string; };
    onSearchChange: (query: string) => Promise<Photo>;
}) {
    const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);

    const { id } = params;

    useEffect(() => {
        async function fetchPhotos() {
            const photos = await onSearchChange(id);
            setFilteredPhotos(photos.results);
        }
        fetchPhotos();
    }, []);

    return (
        <div>
            <div className="flex flex-row">
                <SearchBar id={id} />
            </div>
            <ul className="grid grid-cols-2 gap-5 md:grid-cols-3">
                {filteredPhotos.map(photo => (
                    <li key={photo.id}>
                        <img src={photo.urls.small} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
