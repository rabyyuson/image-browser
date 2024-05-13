"use server";

import { Photo } from "@/lib/types/types";
import Collections from "@/components/photos/collections";
import { fetchPhotos } from "@/lib/actions/fetchPhotos";
import { Suspense } from "react";
import config from "@/config.json";

export default async function Page() {
  async function fetchCollections(): Promise<Photo[]> {
    "use server";

    return await fetchPhotos(
        `${config.unsplash_api_endpoint}${config.unsplash_api.photos.collections.endpoint}` +
        `?per_page=${config.unsplash_api.photos.collections.per_page}`
    );
  }

  const photos = await fetchCollections();

  return (
    <Suspense fallback={(
      <div className="flex items-center justify-center mt-20">
          <h1 className="text-4xl font-bold">
              Fetching photos...
          </h1>
      </div>
    )}>
      <Collections photos={photos} />
    </Suspense>
  );
}
