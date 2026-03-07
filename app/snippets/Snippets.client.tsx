"use client";

import { useState } from "react";
import css from "./Snippets.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchSnippets } from "@/lib/api/clientApi";
import { useDebouncedCallback } from "use-debounce";
import clsx from "clsx";
import Sidebar from "@/components/Sidebar/Sidebar";
import SearchBox from "@/components/SearchBox.tsx/SearchBox";

export default function SnippetsClient() {
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [tag, setTag] = useState("");

  const { data, isError, isSuccess } = useQuery({
    queryKey: ["snippets", topic, page, tag],
    queryFn: () => fetchSnippets(topic, page, 12, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;

  console.log(data);
  console.log(topic);

  const updateSearchWord = useDebouncedCallback((searchWord: string) => {
    setTopic(searchWord);
    setPage(1);
  }, 500);

  return (
    <section className={css.section}>
      <div className={clsx("container", css.container)}>
        <Sidebar onChange={(tag) => setTag(tag)} />
        <div className={css.contentWrap}>
          <SearchBox onChange={updateSearchWord} />
        </div>
      </div>
    </section>
  );
}
