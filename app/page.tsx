"use server";

import Photos from "@/components/photos/photos";
import { Photo } from "@/lib/types/types";
import { fetchPhotos } from "@/lib/actions/fetchPhotos";
import config from "@/config.json";

export default async function Home() {
  let photos = await fetchPhotos({ orderBy: config.photos.list.order_by[0] });

  async function handleOrderByChange(orderBy: string): Promise<Photo[]> {
    "use server";

    return await fetchPhotos({ orderBy });
  }
  
  return (
    <Photos
      photos={photos}
      onFilterChange={handleOrderByChange}
    />
  );
}
