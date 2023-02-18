import Modal from "../../Template/Modal";
import { useContext, useEffect } from "react";
import { modalContext } from "../../../contexts/modalProvider";
import { AuthContext } from "../../../contexts/authProvider";
import style from "./loginModal.module.css";
import Image from "next/image";
import Auth from "../../../lib/auth";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

export default function LoginModal() {
  const { loginState, signupState } = useContext(modalContext);
  const [login, setLogin] = loginState;
  const [signup, setSignup] = signupState;
  const [appState, setAppState] = useContext(AuthContext);

  const router = useRouter();
  const auth = new Auth();

  async function checklogin(id) {
    const data = {
      id: id,
    };
    const response = await fetch("/api/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      const errorMessage = document.getElementById("errorMessage");
      if (res.status == 200) {
        const data = await res.text().then((text) => {
          return text;
        });
        localStorage.setItem("SquadData", data);
        setLogin(false);
        router.push("/");
        errorMessage.innerText = "";
        setAppState(JSON.parse(data));
      } else {
        res.text().then((text) => (errorMessage.innerText = text));
      }
    });
  }
  async function loginWith(method) {
    if (!method) return;

    try {
      if (method === "deso") {
        const request = await auth.loginWithDeSo();
        checklogin(request);
      } else if (method === "metamask") {
        const request = await auth.loginWithMetamask();
        checklogin(request);
      } else if (method === "phantom") {
        const request = await auth.loginWithPhantom();
        checklogin(request);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
  function handleCallbackResponse(response) {
    const user = jwt_decode(response.credential);
    checklogin(user.sub);
  }

  useEffect(() => {
    /* global google */
    const google = window.google;

    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_ID,
      ux_mode: process.env.NEXT_PUBLIC_GOOGLE_UX_MODE,
      scope: process.env.NEXT_PUBLIC_GOOGLE_SCOPE,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("loginWithGoogle"),
      {
        theme: "outline",
        size: "large",
      }
    );
  });

  return (
    <Modal open={login} onClose={() => setLogin(false)}>
      <h1 className={style.title}>Login</h1>
      <div className={style.container}>
        <ul className={style.webthree}>
          <li
            onClick={() => {
              loginWith("deso");
            }}
          >
            <Image
              width={15}
              height={15}
              src="/assets/svgs/deso.svg"
              alt="DeSo icon"
            ></Image>
            DeSo
          </li>
          <li
            onClick={() => {
              loginWith("metamask");
            }}
          >
            <Image
              width={15}
              height={15}
              src="/assets/svgs/metamask.svg"
              alt="Metamask icon"
            ></Image>
            Metamask
          </li>
          <li
            onClick={() => {
              loginWith("phantom");
            }}
          >
            <Image
              width={15}
              height={15}
              src="/assets/svgs/phantom.svg"
              alt="Phantom icon"
            ></Image>
            Phantom
          </li>
        </ul>
        <hr className={style.horizontal}></hr>
        <ul className={style.webtwo}>
          <li id="loginWithGoogle">
            <Image
              width={15}
              height={15}
              src="/assets/svgs/google.svg"
              alt="Google icon"
            ></Image>
            Google
          </li>
          <li className={style.unActive}>
            <Image
              width={15}
              height={15}
              src="/assets/svgs/microsoft.svg"
              alt="Microsoft icon"
            ></Image>
            Microsoft
          </li>
        </ul>
      </div>
      <p className={style.goToSignup}>
        Don&apos;t have an account? Click{" "}
        <a
          href="#"
          onClick={() => {
            setLogin(false);
            setSignup(true);
          }}
        >
          here
        </a>{" "}
        to sign up.
      </p>
      <p id="errorMessage" className={style.error}></p>
    </Modal>
  );
}
