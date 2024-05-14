"use client";

import { useRouter } from "next/navigation";
import { Photo } from "@/lib/types/types";
import { Gallery } from "react-grid-gallery";

export default function Collections({
    photos,
}: {
    photos: Photo[];
}) {
    const router = useRouter();

    const images = photos.map(photo => ({
        src: photo.cover_photo.urls.regular,
        width: photo.cover_photo.width,
        height: photo.cover_photo.height,
        customOverlay: (
          <div className="absolute bottom-0 z-10 bg-black p-5 opacity-80 text-sm rounded-b-lg  text-white flex w-full">
            <div>{
                photo.cover_photo.alt_description.slice(0,1).toUpperCase() +
                photo.cover_photo.alt_description.slice(1,photo.cover_photo.alt_description.length)
            }
            </div>
          </div>
        ),
        alt: photo.cover_photo.alt_description,
    }));

    return (
        <div>
            <Gallery
                images={images}
                enableImageSelection={false}
                rowHeight={400}
                margin={10}
                onClick={(index) => { router.push(`/collection/${index}`) }}
            />
        </div>
    );
}
