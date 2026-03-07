import { Tag } from "./tag";

export interface Snippet {
  _id: string;
  title: string;
  content: string;
  tag: Tag[];
  type: "Link" | "Note" | "Command";
  createdAt: string;
  updatedAt: string;
}
