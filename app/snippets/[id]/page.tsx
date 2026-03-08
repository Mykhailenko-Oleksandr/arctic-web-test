import css from "./SnippetDetails.module.css";
import { fetchSnipperById } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import SnippetDetailsClient from "./SnippetDetailsClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const snippet = await fetchSnipperById(id);

  return {
    title: `Snippet: ${snippet.title}`,
    description: snippet.content.slice(0, 30),
  };
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SnippetDetails({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["snippet", id],
    queryFn: () => fetchSnipperById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className={css.section}>
        <div className="container">
          <SnippetDetailsClient />
        </div>
      </section>
    </HydrationBoundary>
  );
}
