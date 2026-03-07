"use client";

import Link from "next/link";
import css from "./SnippetItem.module.css";
import { Snippet } from "@/types/snippet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteSnippet } from "@/lib/api/clientApi";
import clsx from "clsx";

interface Props {
  snippet: Snippet;
}

export default function SnippetItem({ snippet }: Props) {
  const queryClient = useQueryClient();

  const deleteNoteMutate = useMutation({
    mutationFn: (id: string) => deleteSnippet(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  function handleDeleteNote(id: string) {
    deleteNoteMutate.mutate(id);
  }
  return (
    <li className={css.listItem}>
      <h2 className={css.title}>{snippet.title}</h2>
      <p className={css.content}>{snippet.content}</p>
      {snippet.tag.length > 0 && (
        <ul className={css.listTags}>
          {snippet.tag.map((oneTag) => {
            return (
              <li className={css.tagItem} key={oneTag}>
                {oneTag}
              </li>
            );
          })}
        </ul>
      )}
      <div className={css.footer}>
        <Link className={css.link} href={`/snippets/${snippet._id}`}>
          View details
        </Link>

        <p
          className={clsx(
            css.textType,
            snippet.type === "Link" && css.typeLink,
            snippet.type === "Command" && css.typeCommand,
          )}
        >
          {snippet.type}
        </p>

        <button
          onClick={() => handleDeleteNote(snippet._id)}
          className={css.button}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
