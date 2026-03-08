"use client";

import Loader from "@/components/Loader/Loader";
import css from "./SnippetDetails.module.css";
import { fetchSnipperById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import FormSnippet from "@/components/FormSnippet/FormSnippet";

export default function SnippetDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [isUpdateModal, setIsUpdateModal] = useState(false);

  const {
    data: snippet,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["snippet", id],
    queryFn: () => fetchSnipperById(id),
    refetchOnMount: false,
  });

  function handleBack() {
    router.back();
  }

  if (isLoading) return <Loader />;

  if (error || !snippet) return <p>Something went wrong</p>;

  return (
    <>
      <button className={css.backBtn} onClick={handleBack}>
        Back
      </button>
      <div className={css.contentWrap}>
        <div className={css.item}>
          <div className={css.titleWrap}>
            <h2>{snippet.title}</h2>
            <p>
              Type: <span>{snippet.type}</span>
            </p>
          </div>
          <p className={css.content}>{snippet.content}</p>

          {snippet.tag.length > 0 && (
            <ul className={css.tagsList}>
              {snippet.tag.map((oneTag) => {
                return (
                  <li className={css.tagItem} key={oneTag}>
                    {oneTag}
                  </li>
                );
              })}
            </ul>
          )}
          <div className={css.dateWrap}>
            <p className={css.date}>
              Created: <span>{snippet.createdAt}</span>
            </p>
            <p className={css.date}>
              Updated: <span>{snippet.updatedAt}</span>
            </p>
          </div>

          <button
            className={css.updateBtn}
            type="button"
            onClick={() => setIsUpdateModal(true)}
          >
            Update snippet
          </button>
        </div>
      </div>

      {isUpdateModal && (
        <Modal onClose={() => setIsUpdateModal(false)}>
          <h2 className={css.modalTitle}>Update snipper</h2>
          <FormSnippet
            closeModal={() => setIsUpdateModal(false)}
            update
            snippet={snippet}
          />
        </Modal>
      )}
    </>
  );
}
