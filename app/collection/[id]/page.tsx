"use server";

import { Photo } from "@/lib/types/types";
import Viewer from "@/components/photos/viewer";
import { fetchPhotos } from "@/lib/actions/fetchPhotos";
import config from "@/config.json";

async function fetchCollections(id: string): Promise<Photo[]> {
    return await fetchPhotos(
        `${config.unsplash_api_endpoint}${config.unsplash_api.photos.collections.endpoint}/${id}/photos`
    );
}

async function fetchPhoto(id: string) {
    return await fetchPhotos(
        `${config.unsplash_api_endpoint}${config.unsplash_api.photos.collections.endpoint}/${id}`
    );
}

export default async function Page({
    params,
}: {
    params: {
        id: string;
    },
}) {
    const collections = await fetchCollections(params.id);
    const photo = await fetchPhoto(params.id);

    return (
        <div>
            {collections.length
                ? (
                    <div className="flex flex-col sm:flex-none sm:grid sm:grid-cols-2 sm:grid-flow-row gap-5 mb-10">
                        {collections.map((collection: Photo) => (
                            <Viewer photo={collection} key={collection.id} />
                        ))}
                    </div>
                )
                : <Viewer photo={{
                    ...photo.cover_photo,
                    ...photo,
                }} />
            }
        </div>
    );
}