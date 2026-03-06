"use client";
import css from "./Home.module.css";

type Props = {
  reset: () => void;
};

export default function Error({ reset }: Props) {
  return (
    <div className={`container ${css.section}`}>
      <h2 className={css.title}>Something went wrong 😢</h2>
      <p className={css.description}>Please try again later</p>
      <button
        className={css.buttonError}
        onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
