"use server";

import { Suspense } from "react";
import List from "@/components/photos/list";
import { Photo } from "@/lib/types/types";
import { fetchPhotos } from "@/lib/actions/fetchPhotos";
import config from "@/config.json";

export default async function Home() {
  async function handleOrderByChange(orderBy: string): Promise<Photo[]> {
    "use server";

    return await fetchPhotos(
        `${config.unsplash_api_endpoint}${config.unsplash_api.photos.list.endpoint}` +
        `?per_page=${config.unsplash_api.photos.list.per_page}` +
        `&order_by=${orderBy}`
    );
  }
  
  return (
    <Suspense fallback={(
      <div className="flex items-center justify-center mt-20">
          <h1 className="text-2xl font-bold">
              Fetching photos...
          </h1>
      </div>
    )}>
      <List onOrderByChange={handleOrderByChange} />
    </Suspense>
  );
}
