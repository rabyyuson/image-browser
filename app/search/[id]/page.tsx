"use server";

import Search from "@/components/photos/search";
import { Photo } from "@/lib/types/types";
import { fetchPhotos } from "@/lib/actions/fetchPhotos";
import config from "@/config.json";

export default async function Home({
    params,
}: {
    params: { id: string; };
}) {
  async function handleOnSearchChange(query: string): Promise<Photo> {
    "use server";

    return await fetchPhotos(
        `${config.unsplash_api_endpoint}${config.unsplash_api.photos.search.endpoint}` +
        `?per_page=${config.unsplash_api.photos.search.per_page}` +
        `&query=${query}`
    );
  }
  
  return (
    <Search
        params={params}
        onSearchChange={handleOnSearchChange}
    />
  );
}
