import Modal from "../../Template/Modal";
import { useContext } from "react";
import { modalContext } from "../../../contexts/modalProvider";
import style from "./createCategory.module.css";
import { useRouter } from "next/router";

export default function CreateCategory() {
  const { createCategory } = useContext(modalContext);
  const [state, setState] = createCategory;

  const router = useRouter();

  async function createNewCategory() {
    const { id } = router.query;
    const data = {
      id: id,
      name: document.getElementById("name").value,
    };
    await fetch("/api/addCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async () => {
      setState(false);
    });
  }
  return (
    <Modal
      open={state}
      onClose={() => {
        setState(false);
      }}
    >
      <h1 className={style.title}>Create Category</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createNewCategory();
        }}
      >
        <input
          className={style.input}
          placeholder="Category name"
          id="name"
          required
          autoFocus
        ></input>
        <button className={style.button} type="submit">
          Create
        </button>
      </form>
    </Modal>
  );
}
