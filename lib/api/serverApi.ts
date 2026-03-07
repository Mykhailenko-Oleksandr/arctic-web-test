import { cookies } from "next/headers";
import { nextServer } from "./api";
import { ResponseAPI } from "./clientApi";
import { Snippet } from "@/types/snippet";

export async function fetchSnippets(
  searchWord: string,
  page: number = 1,
  limit: number = 12,
  tag?: string,
) {
  const cookieStore = await cookies();
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
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function fetchSnipperById(id: string) {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<Snippet>(`/snippets/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
