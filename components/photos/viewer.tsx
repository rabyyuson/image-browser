"use client";

import { Photo } from "@/lib/types/types";

export default function Viewer({
    photo,
}: {
    photo: Photo;
}) {
    return (
        <div>
            <div className="flex flex-col md:flex-row gap-5 mb-5">
                <div className="md:w-1/2">
                    <img
                        src={photo.urls.regular}
                        alt=""
                        width={photo.width}
                        height={photo.height}
                        className="rounded-lg"
                    />
                </div>
                <div className="md:w-1/2">
                    <b>User:</b>
                    <p>
                        <a
                            href={photo.user.links.html}
                            className="text-blue-700 underline"
                            target="_blank"
                        >
                            {photo.user.username}
                        </a>
                    </p>
                    <br/>

                    <b>Description:</b>
                    <p>{photo.description || photo.alt_description}</p>
                    <br/>

                    <b>Likes:</b>
                    <p>{photo.likes}</p>
                    <br/>

                    <b>Tags:</b>
                    <p>{photo?.tags?.map((tag: { type: string, title: string }) => tag.title).join(", ")}</p>
                </div>
            </div>
        </div>
    );
}
