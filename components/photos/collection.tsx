"use client";

import { Photo } from "@/lib/types/types";

export default function Collection({
    collection,
}: {
    collection: Photo;
}) {
    console.log(collection)
    return (
        <div>Collection</div>
    );
}
