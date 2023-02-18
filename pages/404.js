import style from "../styles/404.module.css";
import Link from "next/link";
export default function PageNotFound() {
  return (
    <>
      <section className={style.ribbon}>
        <h1 className={style.title}>Looks like you are lost!</h1>
      </section>
      <main className={style.main}>
        <h1>Lets Find You A Home!</h1>
        <p>
          Visit the discovery page to find a squad and meet like-minded people.
          What are you waiting for?
        </p>
        <div>
          <Link href="/discover">
            <button>Let&apos;s Go</button>
          </Link>
        </div>
      </main>
    </>
  );
}
