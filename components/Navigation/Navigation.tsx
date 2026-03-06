"use client";

import Link from "next/link";
import css from "./Navigation.module.css";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main Navigation">
      <ul className={css.navigation}>
        <li className={css.item}>
          <Link
            href="/"
            className={clsx(css.link, pathname === "/" && css.currentPage)}
          >
            Home
          </Link>
        </li>
        <li className={css.item}>
          <Link
            href="/snippers"
            className={clsx(
              css.link,
              pathname === "/snippers" && css.currentPage,
            )}
          >
            Snippers
          </Link>
        </li>
      </ul>
    </nav>
  );
}
