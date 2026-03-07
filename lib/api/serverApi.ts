import { cookies } from "next/headers";
import { nextServer } from "./api";
import { ResponseAPI } from "./clientApi";

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
      search: searchWord,
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
