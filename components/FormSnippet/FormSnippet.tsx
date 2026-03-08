import css from "./FormSnippet.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { Tag } from "@/types/tag";
import clsx from "clsx";
import {
  createSnippet,
  SnippetsFormData,
  updateSnippet,
} from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { ApiError } from "@/app/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Snippet } from "@/types/snippet";

const tags: Tag[] = [
  "Work",
  "Personal",
  "Meeting",
  "Ideas",
  "Finance",
  "Important",
  "Other",
];

const schema = yup
  .object({
    title: yup
      .string()
      .min(1, "Title must be at least 1 character")
      .max(50, "Title must be at most 50 characters")
      .required("Title is required"),
    content: yup
      .string()
      .min(10, "Content must be at least 10 characters")
      .max(100, "Content must be at most 100 characters")
      .required("Content is required"),
    tag: yup
      .array()
      .of(yup.string().oneOf(tags).defined())
      .min(1, "Select at least one tag")
      .required("Tag is required"),
    type: yup
      .string()
      .oneOf(["Link", "Note", "Command"], "Type must be Link, Note or Command")
      .required("Type is required"),
  })
  .required();

interface Props {
  update?: boolean;
  snippet?: Snippet;
  closeModal: () => void;
}

export default function FormSnippet({ closeModal, update, snippet }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SnippetsFormData>({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const createSnippetMutate = useMutation({
    mutationFn: (data: SnippetsFormData) => createSnippet(data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const updateSnippetMutate = useMutation({
    mutationFn: ({ id, data }: { id: string; data: SnippetsFormData }) =>
      updateSnippet(id, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<SnippetsFormData> = async (data) => {
    try {
      if (snippet) {
        updateSnippetMutate.mutate({ id: snippet._id, data });
      } else {
        createSnippetMutate.mutate(data);
      }
      closeModal();
      router.push("/snippets");
      toast.success(update ? "Updated snippet" : "Created Snippet");
    } catch (error: unknown) {
      const err = error as ApiError;

      toast.error(
        err.response?.data?.response?.validation?.body?.message ||
          err.response?.data?.response?.message ||
          err.message,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.inputBox}>
        <input
          type="text"
          placeholder="Enter title"
          defaultValue={snippet?.title}
          className={css.input}
          {...register("title")}
        />

        {errors.title?.message && (
          <span className={css.errorText}>{errors.title?.message}</span>
        )}
      </div>

      <div className={clsx(css.inputBox, css.textareaBox)}>
        <textarea
          rows={5}
          defaultValue={snippet?.content}
          placeholder="Enter content"
          className={css.input}
          {...register("content")}
        />

        {errors.content?.message && (
          <span className={css.errorText}>{errors.content?.message}</span>
        )}
      </div>

      <p className={css.subtitle}>
        Tags: <span>(Select at least one tag)</span>
      </p>
      <div className={clsx(css.checkboxBox, css.inputBox)}>
        {tags.map((tag) => {
          return (
            <label key={tag}>
              <input
                type="checkbox"
                value={tag}
                defaultChecked={snippet?.tag?.includes(tag)}
                {...register("tag")}
              />
              {tag}
            </label>
          );
        })}

        {errors.tag?.message && (
          <span className={css.errorText}>{errors.tag?.message}</span>
        )}
      </div>

      <div className={css.inputBox}>
        <label className={css.selectLabel}>
          Type:&emsp;
          <select
            className={css.select}
            defaultValue={snippet ? snippet.type : "Note"}
            {...register("type")}
          >
            <option value="Link">Link</option>
            <option value="Note">Note</option>
            <option value="Command">Command</option>
          </select>
        </label>

        {errors.type?.message && (
          <span className={css.errorText}>{errors.type?.message}</span>
        )}
      </div>

      <button className={css.submitBtn} type="submit" disabled={!isValid}>
        {update ? "Update snippet" : "Create snippet"}
      </button>
    </form>
  );
}
