import { Snippet } from "@/types/snippet";
import css from "./SnippetsList.module.css";
import SnippetItem from "../SnippetItem/SnippetItem";

interface Props {
  snippets: Snippet[];
}

export default function SnippetsList({ snippets }: Props) {
  return (
    <ul className={css.list}>
      {snippets.map((snippet) => {
        return <SnippetItem snippet={snippet} key={snippet._id} />;
      })}
    </ul>
  );
}
