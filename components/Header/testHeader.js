import style from "./header.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Header(props) {
  return (
    <nav className={style.nav}>
      <Image
        className={style.logo}
        src="/assets/images/logo.png"
        alt="Logo"
        width={208}
        height={47.35195}
        priority
      ></Image>
      <ul className={style.navList}>
        <Link href="/discover">
          <li>Discover</li>
        </Link>
        <li>Login</li>
        <div>
          <button>Sign Up</button>
        </div>
      </ul>
      <button className={style.hamburgerMenu}>
        <div className={style.bar}></div>
      </button>
      {props.mobile && (
        <ul className={style.mainMenu}>
          <li>Discover</li>
          <li>Login</li>
          <div className={style.closeMenu}>+</div>
        </ul>
      )}
    </nav>
  );
}
