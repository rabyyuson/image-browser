"use server";

import List from "@/components/photos/list";
import { Photo } from "@/lib/types/types";
import { fetchPhotos } from "@/lib/actions/fetchPhotos";
import config from "@/config.json";

export default async function Home() {
  async function handleOrderByChange(orderBy: string): Promise<Photo[]> {
    "use server";

    return await fetchPhotos(`${config.unsplash_api_endpoint}${config.photos.list.endpoint}?per_page=${config.photos.list.per_page}&order_by=${orderBy}`);
  }
  
  return (
    <List onOrderByChange={handleOrderByChange} />
  );
}
