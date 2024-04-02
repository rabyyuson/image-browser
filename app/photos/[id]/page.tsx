"use server";

import Viewer from "@/components/photos/viewer";
import { fetchPhotos } from "@/lib/actions/fetchPhotos";
import SearchBar from "@/components/photos/search-bar";
import config from "@/config.json";
import Search from "@/components/photos/search";

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
            <SearchBar id="" />
            <Viewer photo={photo} />
        </>
    );
}
