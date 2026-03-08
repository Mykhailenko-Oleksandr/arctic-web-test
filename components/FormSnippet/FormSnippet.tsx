import css from "./FormSnippet.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { Tag } from "@/types/tag";
import clsx from "clsx";
import { createSnippet, SnippetsFormData } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { ApiError } from "@/app/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    title: yup.string().min(1).max(50).required("Title is required"),
    content: yup.string().min(10).max(100).required("Content is required"),
    tag: yup
      .array()
      .of(yup.string().oneOf(tags).defined())
      .min(1, "Select at least one tag")
      .required(),
    type: yup
      .string()
      .oneOf(["Link", "Note", "Command"])
      .required("Type is required"),
  })
  .required();

interface Props {
  closeModal: () => void;
}

export default function FormSnippet({ closeModal }: Props) {
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

  const createNoteMutate = useMutation({
    mutationFn: (data: SnippetsFormData) => createSnippet(data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<SnippetsFormData> = async (data) => {
    try {
      createNoteMutate.mutate(data);
      closeModal();
      router.push("/snippets");
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
              <input type="checkbox" value={tag} {...register("tag")} />
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
            defaultValue="Note"
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
        Create snippet
      </button>
    </form>
  );
}
