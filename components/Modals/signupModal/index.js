import Modal from "../../Template/Modal";
import { useContext, useEffect } from "react";
import { modalContext } from "../../../contexts/modalProvider";
import { AuthContext } from "../../../contexts/authProvider";
import style from "./signupModal.module.css";
import Image from "next/image";
import Auth from "../../../lib/auth";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

export default function SignupModal() {
  const { signupState, loginState } = useContext(modalContext);
  const [appState, setAppState] = useContext(AuthContext);

  const [signup, setSignup] = signupState;
  const [login, setLogin] = loginState;
  const router = useRouter();
  const auth = new Auth();

  async function createUser(request) {
    const data = {
      _id: request._id,
      displayName: request.displayName,
      profilePicture: request.profilePicture,
      description: request.description,
      email: request.email,
      deso: request.deso,
      metamask: request.metamask,
      phantom: request.phantom,
    };
    await fetch("/api/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      const errorMessage = document.getElementById("errorMessage");
      if (res.status == 201) {
        localStorage.setItem("SquadData", JSON.stringify(data));
        setSignup(false);
        router.push("/discover");
        errorMessage.innerText = "";
        setAppState(data);
      } else {
        res.text().then((text) => (errorMessage.innerText = text));
      }
    });
  }

  async function signupWith(method) {
    if (!method) return;
    try {
      if (method === "deso") {
        const request = await auth.signupWithDeSo();
        createUser(request);
      } else if (method === "metamask") {
        const request = await auth.signupWithMetamask();
        createUser(request);
      } else if (method === "phantom") {
        const request = await auth.signupWithPhantom();
        createUser(request);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
  function handleCallbackResponse(response) {
    const user = jwt_decode(response.credential);
    const request = {
      _id: user.sub, //Unique id for our document (required)
      displayName: user.given_name, //User display name (required)
      profilePicture: user.picture, //User profile picture (required)
      description: "",
      email: user.email, //User email (optional)
      deso: "", //User DeSo key (optional)
      metamask: "", //User Metamask key (optional)
      phantom: "", //User phantom key (optional)
    };
    createUser(request);
  }

  useEffect(() => {
    const google = window.google;
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_ID,
      ux_mode: process.env.NEXT_PUBLIC_GOOGLE_UX_MODE,
      scope: process.env.NEXT_PUBLIC_GOOGLE_SCOPE,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("signupWithGoogle"),
      { theme: "outline", size: "large" }
    );
  });

  return (
    <Modal open={signup} onClose={() => setSignup(false)}>
      <h1 className={style.title}>Sign up</h1>
      <div className={style.container}>
        <ul className={style.webthree}>
          <li onClick={() => signupWith("deso")}>
            <Image
              width={15}
              height={15}
              src="/assets/svgs/deso.svg"
              alt="Deso icon"
            ></Image>
            DeSo
          </li>
          <li onClick={() => signupWith("metamask")}>
            <Image
              width={15}
              height={15}
              src="/assets/svgs/metamask.svg"
              alt="Metamask icon"
            ></Image>
            Metamask
          </li>
          <li onClick={() => signupWith("phantom")}>
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
          <li id="signupWithGoogle">
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
        Already have an account? Click{" "}
        <a
          href="#"
          onClick={() => {
            setSignup(false);
            setLogin(true);
          }}
        >
          here
        </a>{" "}
        to login.
      </p>
      <p id="errorMessage" className={style.error}></p>
    </Modal>
  );
}
