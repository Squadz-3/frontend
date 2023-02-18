import style from "./loginDeso.module.css";
import Modal from "../../Template/Modal";
import { modalContext } from "../../../contexts/modalProvider";
import { AuthContext } from "../../../contexts/authProvider";
import Image from "next/image";
import { useContext } from "react";
import Auth from "../../../lib/auth";

export default function LoginDeso() {
  const { loginDeso, loginDesoText } = useContext(modalContext);
  const [state, setState] = loginDeso;
  const [user] = useContext(AuthContext);

  const text = loginDesoText;
  const auth = new Auth();

  async function addDesoAccount() {
    const key = await auth.getDesoAccount();
    const data = {
      collection: "_users",
      id: user._id,
      field: "deso",
      value: key,
    };
    await fetch("/api/updateSingleField", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (res.status == 200) {
        setState(false);
        const userData = JSON.parse(localStorage.getItem("SquadData"));
        userData.deso = localStorage.getItem("deso_user_key");
        localStorage.setItem("SquadData", JSON.stringify(userData));
      } else {
        const errorMessage = document.getElementById("errorMessage");
        res.text().then((text) => (errorMessage.innerText = text));
      }
    });
  }

  return (
    <Modal open={state} onClose={() => setState(false)}>
      <h1 className={style.title}>Hold Up!</h1>
      <p className={style.desoLoginText}>
        In order to {text} you must first be logged in with DeSo.
      </p>
      <button className={style.desoLogin} onClick={() => addDesoAccount()}>
        <Image
          width={20}
          height={20}
          src="/assets/svgs/deso.svg"
          alt="DeSo icon"
        ></Image>
        DeSo
      </button>
      <p id="errorMessage" className={style.error}></p>
    </Modal>
  );
}
