"use server";

import { Photo } from "@/lib/types/types";
import dotenv from "dotenv";

dotenv.config();

export async function fetchPhotos(requestUrl: string) {
    try {
        const fetchData = async () => {
            const response = await fetch(
                requestUrl,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Client-ID ${process.env.ACCESS_KEY}`,
                    },
                }
            );
            const data = await response.json();
            return data;
        }
        return fetchData();
    } catch(error) {
        console.error(`Unable to fetch photos: ${error}`)
        return [];
    }
}