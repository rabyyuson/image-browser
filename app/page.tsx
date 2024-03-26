"use server";

import Photos from "@/components/photos/photos";
import { fetchPhotos } from "@/lib/actions/fetchPhotos";

export default async function Home() {
  const photos = await fetchPhotos();
  
  return (
    <Photos photos={photos} />
  );
}
