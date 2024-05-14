"use server";

import { Suspense } from "react";
import Search from "@/components/photos/search";
import { Photo } from "@/lib/types/types";
import { fetchPhotos } from "@/lib/actions/fetchPhotos";
import config from "@/config.json";

export default async function Home({
    params,
}: {
    params: {
      id: string;
    };
}) {
  async function handleOnSearchChange(query: string, orderBy: string): Promise<Photo> {
    "use server";

    return await fetchPhotos(
        `${config.unsplash_api_endpoint}${config.unsplash_api.photos.search.endpoint}` +
        `?per_page=${config.unsplash_api.photos.search.per_page}` +
        `&query=${query}` +
        `&order_by=${orderBy}`
    );
  }
  
  return (
    <Suspense fallback={(
      <div className="flex items-center justify-center mt-20">
          <h1 className="text-2xl font-bold">
              Searching photos...
          </h1>
      </div>
    )}>
      <Search
          params={params}
          onSearchChange={handleOnSearchChange}
      />
    </Suspense>
  );
}
