import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import SnippetsClient from "./Snippets.client";
import { fetchSnippets } from "@/lib/api/serverApi";

// Prefetch виконується тільки для першої сторінки без пошуку (topic="").
// На клієнті NotesClient вже сам керує topic та page.
const topic = "";
const page = 1;

export default async function Snippers() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["snippets", topic, page, ""],
    queryFn: () => fetchSnippets(topic, page),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SnippetsClient />
    </HydrationBoundary>
  );
}
