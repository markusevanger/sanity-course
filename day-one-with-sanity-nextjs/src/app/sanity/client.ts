import { createClient } from "next-sanity";

export const client = createClient({
    projectId: "9b2k37fl",
    dataset: "production",
    apiVersion: "2024-11-01",
    useCdn: false,
}); 