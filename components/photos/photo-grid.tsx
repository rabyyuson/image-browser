import { Photo } from "@/lib/types/types";
import Link from "next/link";

export default function PhotoGrid({
    photos,
}: {
    photos: Photo[];
}) {
    return (
        <ul className="grid grid-cols-2 gap-5 md:grid-cols-3">
            {photos.map(photo => (
                <li key={photo.id}>
                    <Link href={`photos/${photo.id}`}>
                        <img src={photo.image.url} />
                    </Link>
                </li>
            ))}
        </ul>
    );
}
