"use client";

import { useEffect, useState } from "react";
import { Photo } from "@/lib/types/types";
import config from "@/config.json";
import { useRouter } from "next/navigation";
import { Gallery } from "react-grid-gallery";
import Image from "next/image";
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
    const router = useRouter();
    
    const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
    const [selectedOrderBy, setSelectedOrderBy] = useState(config.unsplash_api.photos.search.order_by[0]);
    const [isLoading, setIsLoading] = useState(false);

    const { id } = params;

    useEffect(() => {
        setIsLoading(true);
        async function fetchPhotos() {
            const photos = await onSearchChange(id, config.unsplash_api.photos.search.order_by[0]);
            setFilteredPhotos(photos.results);
            setIsLoading(false);
        }
        fetchPhotos();
    }, []);

    const images = filteredPhotos.map(photo => ({
        id: photo.id,
        src: photo.urls.regular,
        width: photo.width,
        height: photo.height,
        customOverlay: photo.alt_description && (
            <div className="absolute bottom-0 z-10 bg-black p-5 opacity-80 text-sm rounded-b-lg  text-white flex w-full">
                <div>{photo.alt_description}
                </div>
            </div>
        ),
        alt: photo.alt_description,
    }));

    return (
        <div className="-mt-5">
            {isLoading && (
                <div className="flex items-center justify-center mt-[60px]">
                    <Image
                        src="/loading.gif"
                        width={50}
                        height={50}
                        alt="Loading image"
                    />
                </div>
            )}
            {(!isLoading && Boolean(images.length)) && (
                <div className="border-t-[1px] border-gray-700 pt-5 flex flex-col sm:flex-row items-center justify-center gap-2 p-5 rounded-md bg-gray-900 mb-3">
                    <div className="flex flex-row gap-2 items-center justify-center">
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
            {(!isLoading && !Boolean(images.length)) && (
                <div className="flex items-center justify-center mt-20">
                    <h1 className="text-2xl font-bold">
                        No photos found for <span className="text-lime-800">{id}</span>
                    </h1>
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
