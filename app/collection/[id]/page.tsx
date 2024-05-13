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
                ? collections.map((collection: Photo) => (
                    <Viewer photo={collection} key={collection.id} />
                ))
                : <Viewer photo={{
                    ...photo.cover_photo,
                    ...photo,
                }} />
            }
        </div>
    );
}