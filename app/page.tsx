"use server";

import Photos from "@/components/photos/photos";
import { Photo } from "@/lib/types/types";
import { fetchPhotos } from "@/lib/actions/fetchPhotos";
import config from "@/config.json";

export default async function Home() {
  const listEndpoint = `${config.unsplash_api_endpoint}${config.photos.list.endpoint}`;
  const searchEndpoint = `${config.unsplash_api_endpoint}${config.photos.search.endpoint}`;

  async function handleOrderByChange(orderBy: string): Promise<Photo[]> {
    "use server";

    return await fetchPhotos(`${listEndpoint}?per_page=${config.photos.list.per_page}&order_by=${orderBy}`);
  }

  async function handleOnSearchChange(query: string): Promise<Photo> {
    "use server";

    return await fetchPhotos(`${searchEndpoint}?per_page=${config.photos.search.per_page}&query=${query}`);
  }
  
  const photos = await fetchPhotos(`${listEndpoint}?per_page=${config.photos.list.per_page}&order_by=${config.photos.list.order_by[0]}`);

  return (
    <Photos
      photos={photos}
      onOrderByChange={handleOrderByChange}
      onSearchChange={handleOnSearchChange}
    />
  );
}
