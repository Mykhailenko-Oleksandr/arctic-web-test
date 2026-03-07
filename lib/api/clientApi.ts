import { Snippet } from "@/types/snippet";
import { nextServer } from "./api";

export interface ResponseAPI {
  page: number;
  limit: number;
  totalSnippets: number;
  totalPages: number;
  snippets: Snippet[];
}

export async function fetchSnippets(
  searchWord: string,
  page: number = 1,
  limit: number = 12,
  tag?: string,
) {
  if (tag === "All") {
    tag = undefined;
  }

  const { data } = await nextServer.get<ResponseAPI>("/snippets", {
    params: {
      q: searchWord,
      tag: tag,
      page,
      limit,
    },
  });
  return data;
}

// export async function sample(id: string) {
//   const res = await nextServer.get<{a: string}>(`/sample/${id}`);
//   return res.data;
// }
