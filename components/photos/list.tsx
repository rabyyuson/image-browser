"use client";

import { useEffect, useState } from "react";
import { Photo } from "@/lib/types/types";
import config from "@/config.json";
import { useRouter } from "next/navigation";
import { Gallery } from "react-grid-gallery";
import clsx from "clsx";

export default function List({
    onOrderByChange,
}: {
    onOrderByChange: (orderBy: string) => Promise<Photo[]>;
}) {
    const router = useRouter();
    
    const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
    const [selectedOrderBy, setSelectedOrderBy] = useState(config.unsplash_api.photos.list.order_by[0]);

    useEffect(() => {
        async function fetchPhotos() {
            const photos = await onOrderByChange(config.unsplash_api.photos.list.order_by[0]);
            setFilteredPhotos(photos);
        }
        fetchPhotos();
    }, []);

    const images = filteredPhotos.map(photo => ({
        id: photo.id,
        src: photo.urls.small,
        width: photo.width,
        height: photo.height,
        customOverlay: (
          <div className="absolute bottom-0 z-10 bg-black p-5 opacity-80 text-sm rounded-b-lg  text-white flex w-full">
            <div>{
                photo.alt_description.slice(0,1).toUpperCase() +
                photo.alt_description.slice(1,photo.alt_description.length)
            }
            </div>
          </div>
        ),
        alt: photo.alt_description,
    }));

    return (
        <div className="-mt-5">
            {Boolean(images.length) && (
                <div className="border-t-[1px] border-gray-700 pt-5 flex flex-col sm:flex-row items-center justify-center gap-2 p-5 rounded-md bg-gray-900 mb-3">
                    <div className="flex flex-row gap-2 items-center justify-center">
                        {config.unsplash_api.photos.list.order_by.map((orderBy, index) => (
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
                                        "text-white rounded-md flex font-semibold text-sm px-4 py-2 cursor-pointer",
                                        selectedOrderBy === orderBy
                                            ? "bg-lime-600"
                                            : "bg-lime-800",
                                        
                                    )}
                                >
                                    {orderBy.charAt(0).toUpperCase()}{orderBy.slice(1,orderBy.length)}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <ul>
                <Gallery
                    images={images}
                    enableImageSelection={false}
                    rowHeight={400}
                    margin={10}
                    onClick={(index) => { router.push(`/photos/${images[index].id}`) }}
                />
            </ul>
        </div>
    );
}
