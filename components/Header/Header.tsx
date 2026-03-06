import css from "./Header.module.css";

export default async function Header() {
  return (
    <header className={css.header}>
      <div className="container">
        <h2>Header</h2>
      </div>
    </header>
  );
}
