"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Photo } from "@/lib/types/types";
import { Gallery } from "react-grid-gallery";
import Image from "next/image";

export default function Collections({
    onFetchCollections,
}: {
    onFetchCollections: () => Promise<Photo[]>;
}) {
    const router = useRouter();

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        async function fetchPhotos() {
            const photos = await onFetchCollections();
            setPhotos(photos);
            setIsLoading(false);
        }
        fetchPhotos();
    }, []);

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
            {isLoading && (
                <div className="flex items-center justify-center mt-10">
                    <Image
                        src="/loading.gif"
                        width={50}
                        height={50}
                        alt="Loading image"
                    />
                </div>
            )}
            {(!isLoading && Boolean(images.length)) && (
                <Gallery
                    images={images}
                    enableImageSelection={false}
                    rowHeight={400}
                    margin={10}
                    onClick={(index) => { router.push(`/collection/${index}`) }}
                />
            )}
        </div>
    );
}
