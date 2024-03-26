"use client";

import { Photo } from "@/lib/types/types";

export default function Photos({
    photos,
}: {
    photos: Photo[];
}) {
    return (
        <div className="container mx-auto">
            <h1>Photos</h1>
            <ul className="flex flex-row gap-10">
                {photos.map(photo => (
                    <li key={photo.id}>
                        <img src={photo.urls.small} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
