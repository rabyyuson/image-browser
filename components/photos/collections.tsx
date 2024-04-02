"use client";

import { Photo } from "@/lib/types/types";
import SearchBar from "@/components/photos/search-bar";
import PhotoGrid from "@/components/photos/photo-grid";

export default function Collections({
    photos,
}: {
    photos: Photo[];
}) {
    return (
        <div>
            <SearchBar id="" />
            <PhotoGrid
                photos={photos.map(photo => (
                    {
                        id: photo.id,
                        image: {
                            url: photo.cover_photo.urls.small,
                        },
                    }
                ))}
            />
        </div>
    );
}
