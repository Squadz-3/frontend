import Modal from "../../Template/Modal";
import { useContext } from "react";
import { modalContext } from "../../../contexts/modalProvider";
import { squadContext } from "../../../contexts/squadProvider";
import style from "./createChannel.module.css";
import { useRouter } from "next/router";

export default function CreateChannel() {
  const { createChannel, createChannelName } = useContext(modalContext);
  const { squadValue } = useContext(squadContext);
  const [state, setState] = createChannel;
  const router = useRouter();

  const [value] = squadValue;

  const [channel] = createChannelName;

  async function createNewChannel() {
    const { id } = router.query;
    const data = {
      id: id,
      name: document.getElementById("name").value,
      channel: channel,
      channels: value.channels,
    };
    await fetch("/api/addChannel", {
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
      <h1 className={style.title}>Create Channel</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createNewChannel();
        }}
      >
        <input
          className={style.input}
          placeholder="Channel name"
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
