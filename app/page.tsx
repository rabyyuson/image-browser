"use server";

import { Photo } from "@/lib/types/types";
import Collections from "@/components/photos/collections";
import { fetchPhotos } from "@/lib/actions/fetchPhotos";
import config from "@/config.json";

export default async function Page() {
  async function handleFetchCollections(): Promise<Photo[]> {
    "use server";

    return await fetchPhotos(
        `${config.unsplash_api_endpoint}${config.unsplash_api.photos.collections.endpoint}` +
        `?per_page=${config.unsplash_api.photos.collections.per_page}`
    );
  }

  return (
    <Collections onFetchCollections={handleFetchCollections} />
  );
}
