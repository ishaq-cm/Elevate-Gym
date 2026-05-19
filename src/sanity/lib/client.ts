import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "3l5aifnv",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: true,
  perspective: "published",
});
