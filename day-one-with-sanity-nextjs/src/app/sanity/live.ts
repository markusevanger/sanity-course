import { defineLive } from "next-sanity";
import { client } from "@/app/sanity/client";

export const { sanityFetch, SanityLive } = defineLive({
    client: clienwt.withConfig({ apiVersion: "vX" }),
});