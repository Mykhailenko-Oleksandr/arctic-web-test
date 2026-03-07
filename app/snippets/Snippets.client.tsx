"use client";

import { useState } from "react";
import css from "./Snippets.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchSnippets } from "@/lib/api/clientApi";
import { useDebouncedCallback } from "use-debounce";
import clsx from "clsx";
import Sidebar from "@/components/Sidebar/Sidebar";
import SearchBox from "@/components/SearchBox.tsx/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import SnippetsList from "@/components/SnippetsList/SnippetsList";
import Loader from "@/components/Loader/Loader";

export default function SnippetsClient() {
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [tag, setTag] = useState("");
  const [isCreateModal, setIsCreateModal] = useState(false);

  const { data, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["snippets", topic, page, tag],
    queryFn: () => fetchSnippets(topic, page, 12, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;

  const updateSearchWord = useDebouncedCallback((searchWord: string) => {
    setTopic(searchWord);
    setPage(1);
  }, 500);

  if (isLoading) return <Loader />;

  return (
    <>
      <Sidebar onChange={(tag) => setTag(tag)} />
      <div className={css.contentWrap}>
        <div className={css.topBox}>
          <SearchBox onChange={updateSearchWord} />
          {isSuccess && totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              page={page}
              updatePage={setPage}
            />
          )}
          <button
            type="button"
            className={css.createBtn}
            onClick={() => setIsCreateModal(true)}
          >
            Create snippet
          </button>
        </div>

        {isError && <p>There was an error, please try again...</p>}

        {data !== undefined && data?.snippets.length === 0 && (
          <p>No snippets found</p>
        )}

        {data !== undefined && data?.snippets.length > 0 && (
          <SnippetsList snippets={data?.snippets} />
        )}
      </div>

      {isCreateModal && (
        <Modal onClose={() => setIsCreateModal(false)}>
          <h2>Hello</h2>
        </Modal>
      )}
    </>
  );
}
