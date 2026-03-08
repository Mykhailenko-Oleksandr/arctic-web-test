import { Snippet } from "@/types/snippet";
import { nextServer } from "./api";
import { Tag } from "@/types/tag";

export interface ResponseAPI {
  page: number;
  limit: number;
  totalSnippets: number;
  totalPages: number;
  snippets: Snippet[];
}

export interface SnippetsFormData {
  title: string;
  content: string;
  tag: Tag[];
  type: "Link" | "Note" | "Command";
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

export async function deleteSnippet(id: string) {
  const { data } = await nextServer.delete<Snippet>(`/snippets/${id}`);
  return data;
}

export async function fetchSnipperById(id: string) {
  const { data } = await nextServer.get<Snippet>(`/snippets/${id}`);
  return data;
}

export async function createSnippet(data: SnippetsFormData) {
  const res = await nextServer.post<Snippet>("/snippets", data);
  return res.data;
}

export async function updateSnippet(id: string, data: SnippetsFormData) {
  const res = await nextServer.patch<Snippet>(`/snippets/${id}`, data);
  return res.data;
}
