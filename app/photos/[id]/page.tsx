"use server";

import Viewer from "@/components/photos/viewer";
import { fetchPhotos } from "@/lib/actions/fetchPhotos";
import config from "@/config.json";

async function fetchPhoto(id: string) {
    return await fetchPhotos(
        `${config.unsplash_api_endpoint}${config.unsplash_api.photos.list.endpoint}/${id}`
    );
}

export default async function Page({
    params,
}: {
    params: {
        id: string;
    }
}) {
    const photo = await fetchPhoto(params.id);

    return (
        <>
            <Viewer photo={photo} />
        </>
    );
}
