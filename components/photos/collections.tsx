"use client";

import { Photo } from "@/lib/types/types";

export default function Collections({
    photos,
}: {
    photos: Photo[];
}) {
    return (
        <div>
            <ul className="grid grid-cols-2 gap-5 md:grid-cols-4">
                {photos.map(photo => (
                    <li key={photo.id}>
                        <img src={photo.cover_photo.urls.small} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
