import Modal from "../../Template/Modal";
import { useContext } from "react";
import { modalContext } from "../../../contexts/modalProvider";
import style from "./deleteSquad.module.css";
import { useRouter } from "next/router";

export default function DeleteSquad() {
  const { deleteSquad, deleteSquadText } = useContext(modalContext);

  const [state, setState] = deleteSquad;
  const router = useRouter();

  const [text] = deleteSquadText;

  async function deleteSquadz() {
    if (document.getElementById("name").value.trim() == text.trim()) {
      const { id } = router.query;
      const data = {
        id: id,
      };
      await fetch("/api/deleteSquad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(async () => {
        setState(false);
        router.push("/");
      });
    }
  }
  return (
    <Modal
      open={state}
      onClose={() => {
        setState(false);
      }}
    >
      <h1 className={style.title}>Delete Squad</h1>
      <p className={style.desc}>
        Are you sure you want to delete this Squad? This descision is permanent
        and cannot be undone. Type in the name of the Squad to confirm.
      </p>
      <h2 className={style.name}>{text}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          deleteSquadz();
        }}
      >
        <input
          className={style.input}
          placeholder={text}
          id="name"
          required
          autoFocus
          onKeyUp={() => {
            if (document.getElementById("name").value.trim() == text.trim()) {
              document.getElementById("deleteBtn").style.cursor = "pointer";
              document.getElementById("deleteBtn").style.backgroundColor =
                "var(--button-color)";
            }
          }}
        ></input>
        <button id="deleteBtn" className={style.button} type="submit">
          Delete
        </button>
      </form>
    </Modal>
  );
}
