import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "placeholder-project-id",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-03-11", // use current date (YYYY-MM-DD) to target latest API version
  useCdn: true, // `false` if you want to ensure fresh data
});
