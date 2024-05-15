"use client";

import { useState } from "react";
import { Photo } from "@/lib/types/types";
import Link from "next/link";
import Calendar from "@/components/icons/calendar";
import Camera from "@/components/icons/camera";
import MapPin from "@/components/icons/map-pin";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function Viewer({
    photo,
}: {
    photo: Photo;
}) {
    const [expandImage, setExpandImage] = useState(false);
    
    if (photo?.errors) {
        return (
            <div className="flex items-center justify-center mt-10">
                <h1 className="text-2xl font-bold">
                    {photo.errors.toString()}
                </h1>
            </div>
        );
    }

    const createdAt = new Date(photo.created_at);
    const options: Intl.DateTimeFormatOptions = {
      weekday: undefined,
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return (
        <div className="px-5 py-10 lg:p-10 my-5 bg-gray-50 border border-gray-100 drop-shadow-md rounded-lg h-full items-center justify-center">
            <Lightbox
                open={expandImage}
                close={() => setExpandImage(false)}
                slides={[ { src: photo.urls.raw } ]}
                render={{
                    buttonPrev: () => null,
                    buttonNext: () => null,
                }}
            />
            <div className="flex flex-row items-center justify-center relative mb-10 lg:mb-20">
                <img
                    src={photo.urls.regular}
                    alt={photo.alt_description}
                    width={500}
                    height={500}
                    className="rounded-lg cursor-pointer z-0 hover:opacity-80"
                    onClick={() => { setExpandImage(true) }}
                />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col md:flex-row justify-between mb-5 lg:mb-10 gap-5 md:gap-0">
                    <div className="flex flex-col">
                        <a
                            href={photo.user.links.html}
                            className="flex flex-row gap-2 items-center"
                            target="_blank"
                        >
                            <img
                                src={photo.user.profile_image.small}
                                className="rounded-full drop-shadow-sm border border-slate-100 p-1 bg-white"
                            />
                            <span className="font-semibold text-sm">
                                {photo.user.username}
                            </span>
                        </a>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-5 lg:gap-10">
                        {photo.views && (
                            <div className="flex flex-col lg:items-center">
                                <span className="font-base text-sm text-slate-500">
                                    Views
                                </span>
                                <span className="font-semibold text-sm">
                                    {photo.views}
                                </span>
                            </div>
                        )}
                        {photo.likes && (
                            <div className="flex flex-col lg:items-center">
                                <span className="font-base text-sm text-slate-500">
                                    Likes
                                </span>
                                <span className="font-semibold text-sm">
                                    {photo.likes}
                                </span>
                            </div>
                        )}
                        {photo.downloads && (
                            <div className="flex flex-col lg:items-center">
                                <span className="font-base text-sm text-slate-500">
                                    Downloads
                                </span>
                                <span className="font-semibold text-sm">
                                    {photo.downloads}
                                </span>
                            </div>
                        )}
                        {photo.color && (
                            <div className="flex flex-col lg:items-center">
                                <span className="font-base text-sm text-slate-500">
                                    Color
                                </span>
                                <span className="font-semibold text-sm mt-[2px]">
                                    <span className={`w-4 h-4 flex drop-shadow-sm rounded-full`} style={{ backgroundColor: photo.color }}></span>
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {photo.created_at && (
                    <div className="flex flex-row gap-2 items-center font-base text-sm text-slate-500">
                        <Calendar />
                        {" "}
                        Published on {createdAt.toLocaleDateString("en-US", options)}
                    </div>
                )}

                {photo.location?.name && (
                    <div className="flex flex-row gap-2 items-center font-base text-sm text-slate-500">
                        <MapPin />
                        {" "}
                        {photo.location.name}
                    </div>
                )}

                {photo.exif?.name && (
                    <div className="flex flex-row gap-2 items-center font-base text-sm text-slate-500">
                        <Camera />
                        {" "}
                        {photo.exif.name}
                    </div>
                )}

                <div className="flex flex-row gap-2 items-center font-base text-sm text-slate-900 mt-5 mb-10">
                    {photo.description || photo.alt_description}
                </div>
                
                {Boolean(photo.tags) && (
                    <ul className="flex flex-wrap gap-5">
                        {photo.tags.map((tag: { type: string, title: string }) => (
                            <li key={tag.title}>
                                <Link
                                    href={`/search/${tag.title}`}
                                    className="py-2 px-4 bg-slate-200 drop-shadow-sm rounded-lg text-sm text-slate-900 hover:bg-slate-300 transition duration-100"
                                >
                                    {tag.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
