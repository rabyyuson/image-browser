"use server";

import { Photo } from "@/lib/types/types";
import config from "@/config.json";
import dotenv from "dotenv";

dotenv.config();

export async function fetchPhotos(): Promise<Photo[]> {
    try {
        const fetchData = async () => {
            const response = await fetch(
                `${config.unsplash_api_endpoint}/photos`,
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