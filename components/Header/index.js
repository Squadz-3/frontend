import { useState, useContext, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { AuthContext } from "../../contexts/authProvider";
import { modalContext } from "../../contexts/modalProvider";

import style from "./header.module.css";

export default function Header() {
  const { loginState, signupState, loginDeso, loginDesoText, createSquad } =
    useContext(modalContext);
  const [mainMenuState, setMainMenuState] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();

  const [login, setLogin] = loginState;
  const [signup, setSignup] = signupState;
  const [desoLogin, setLoginDeso] = loginDeso;
  const [desoLoginText, setDesoLoginText] = loginDesoText;
  const [createSquadState, setCreateSquadState] = createSquad;

  useEffect(() => {
    const user = localStorage.getItem("SquadData");
    if (user) {
      setAuth(JSON.parse(user));
    } else {
      setAuth(false);
    }
  }, []);

  function routeToMain() {
    if (auth) {
      if (router.pathname != "/") {
        router.push("/");
      }
    } else {
      if (router.pathname != "/home") {
        router.push("/home");
      }
    }
  }

  function displayMenu() {
    const Triangle = document.getElementById("Triangle");

    if (Triangle.style.transform == "rotate(180deg)") {
      Triangle.style.transform = "rotate(0deg)";
      document.getElementById("Menu").style.display = "none";
      document.getElementById("Menu").style.opacity = "0";
    } else {
      Triangle.style.transform = "rotate(180deg)";
      document.getElementById("Menu").style.display = "block";
      document.getElementById("Menu").style.opacity = "100";
    }
  }
  async function signOut() {
    router.push("/home");
    localStorage.removeItem("SquadData");
    localStorage.removeItem("deso_user_key");

    setAuth(false);
  }
  async function checkDesoThenCreate() {
    const user = localStorage.getItem("deso_user_key");
    if (user) {
      setCreateSquadState(true);
    } else {
      setLoginDeso(true);
      setDesoLoginText("create a community");
    }
  }

  return (
    <nav className={style.nav}>
      <Image
        className={style.logo}
        src="/assets/images/logo.png"
        alt="Logo"
        width={208}
        height={47}
        onClick={() => routeToMain()}
        priority
      ></Image>
      <ul className={style.navList}>
        <Link aria-label="Discover" href="/discover">
          <li>Discover</li>
        </Link>
        {auth ? (
          <>
            <li onClick={() => checkDesoThenCreate()}>Create</li>
            <img
              className={style.loggedInProfile}
              src={auth.profilePicture}
              alt="Profile"
            ></img>
            <p className={style.loggedInText}>{auth.displayName}</p>
            <Image
              id="Triangle"
              onClick={() => displayMenu()}
              className={style.triangle}
              src="/assets/svgs/triangle-down.svg"
              alt="Triangle down"
              width={22.4}
              height={22.4}
            ></Image>
            {/* ===== Dropdown Menu ===== */}

            <ul className={style.menu} id="Menu">
              <Link aria-label="Settings" href="/settings/account">
                <div>
                  {" "}
                  <Image
                    src="/assets/svgs/settings.svg"
                    alt="Settings"
                    width={20}
                    height={20}
                  ></Image>
                  Settings
                </div>
              </Link>
              <div
                onClick={() => {
                  signOut(), setAuth(false);
                }}
              >
                <Image
                  src="/assets/svgs/logout.svg"
                  alt="Logout"
                  width={20}
                  height={20}
                ></Image>
                Sign out
              </div>
            </ul>
          </>
        ) : (
          <>
            <li onClick={() => setLogin(true)}>Login</li>
            <div>
              <button aria-label="Sign up" onClick={() => setSignup(true)}>
                Sign Up
              </button>
            </div>
          </>
        )}
      </ul>
      {!auth && (
        <button
          aria-label="Hamburger Menu"
          className={style.hamburgerMenu}
          onClick={() => setMainMenuState(true)}
        >
          <div className={style.bar}></div>
        </button>
      )}

      {mainMenuState && (
        <ul className={style.mainMenu}>
          <Link aria-label="Discover" href="/discover">
            <li>Discover</li>
          </Link>

          <li onClick={() => setLogin(true)}>Login</li>
          <div
            className={style.closeMenu}
            onClick={() => setMainMenuState(false)}
          >
            +
          </div>
        </ul>
      )}
    </nav>
  );
}
