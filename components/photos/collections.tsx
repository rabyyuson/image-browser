"use client";

import { Photo } from "@/lib/types/types";
import SearchBar from "@/components/photos/search-bar";
import Link from "next/link";

export default function Collections({
    photos,
}: {
    photos: Photo[];
}) {
    return (
        <div>
            <SearchBar id="" />
            <ul className="grid grid-cols-2 gap-5 md:grid-cols-3">
                {photos.map(photo => (
                    <li key={photo.id}>
                        <Link href={`/collection/${photo.id}`}>
                            <img src={photo.cover_photo.urls.small} className="rounded-lg" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
