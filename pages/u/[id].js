import style from "../../styles/Chat.module.css";
import { useRouter } from "next/router";
import { useEffect, useState, useContext, useRef } from "react";
import { useSocket } from "../../contexts/socketProvider";
import { modalContext } from "../../contexts/modalProvider";

import { squadContext } from "../../contexts/squadProvider";
import Image from "next/image";
import DesoApi from "../api/DeSo";
import EmojiPicker from "../../components/EmojiPicker";

export default function Squad({ data, messages }) {
  const { loginDeso, loginDesoText } = useContext(modalContext);
  const { squadValue } = useContext(squadContext);
  const router = useRouter();
  const [image, setImage] = useState();
  const [emojishow, setEmojiShow] = useState("none");
  const [value, setValue] = squadValue;

  const [desoLogin, setLoginDeso] = loginDeso;
  const [desoLoginText, setDesoLoginText] = loginDesoText;
  const inputFile = useRef(null);
  const deso = new DesoApi();
  const [message, setMessage] = useState(messages);

  const socket = useSocket();

  const placeHolderOptions = [
    "I think therefore I am.",
    "I destroy my enemies when I make them my friends. ",
    "Do not live the same year 75 times and call it a life.",
    "You cannot save people, you can just love them.",
    "It was not raining when Noah built the ark.",
    "Take your dreams seriously.",
    "There is no way to happiness. Happiness is the way.",
    "You will succeed because most people are lazy.",
    "Genius is 1% inspiration, 99% perspiration.",
    "You must be the change you wish to see in the world.",
    "Do it with passion, or not at all.",
    "The grass is greener where you water it.",
    "Sometimes you win, sometimes you learn.",
    "I never dream of success. I worked for it.",
    "Avoiding failure is to avoid progress.",
  ];

  useEffect(() => {
    if (data) {
      if (
        data[0].members.includes(
          JSON.parse(localStorage.getItem("SquadData"))._id
        )
      ) {
        setValue(data[0]);
      } else {
        router.push("/notAllowed");
      }
    }
  }, [router.asPath]);

  /* ===== Image ===== */
  function uploadImage() {
    if (localStorage.getItem("deso_user_key")) {
      inputFile.current.click();
    } else {
      setLoginDeso(true);
      setDesoLoginText("upload an image");
    }
  }

  const changeHandler = (event) => {
    //Get the selected image
    const img = event.target.files[0];
    getImageUrl(img);
  };

  async function getImageUrl(result) {
    const user = localStorage.getItem("deso_user_key");
    const JWT = await deso.getJwt(user);
    const link = await deso.uploadImage(user, JWT, result);
    setImage(link);
  }

  function showemoji() {
    if (document.getElementById("emojiPicker").style.display == "none") {
      setEmojiShow("block");
    } else {
      setEmojiShow("none");
    }
  }

  useEffect(() => {
    router.replace(router.asPath);
  }, [router.asPath]);

  useEffect(() => {
    setMessage(messages);
  }, [messages]);

  useEffect(() => {
    var messageContainer = document.getElementById("messageContainer");
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }, [message]);

  useEffect(() => {
    if (socket) {
      socket.on("newIncomingMessage", (msg) => {
        if (
          msg.channel == router.query.channel &&
          msg.sub == router.query.sub
        ) {
          setMessage((message) => [...message, msg]);
        }
      });
    }
  }, [socket]);

  const broadCastMessage = async (msg) => {
    socket.emit("createdMessage", msg);
    setMessage((message) => [...message, msg]);
  };
  async function sendMessage() {
    const message = document.getElementById("messageInput").value;
    if (message || image) {
      const data = {
        message: message,
        image: image,
        channel: router.query.channel,
        sub: router.query.sub,
        senderId: JSON.parse(localStorage.getItem("SquadData"))._id,
        id: router.query.id,
      };
      const sendData = {
        message: message,
        image: image,
        channel: router.query.channel,
        sub: router.query.sub,
        senderId: JSON.parse(localStorage.getItem("SquadData"))._id,
        id: router.query.id,
        userInfo: {
          displayName: JSON.parse(localStorage.getItem("SquadData"))
            .displayName,
          profilePicture: JSON.parse(localStorage.getItem("SquadData"))
            .profilePicture,
        },
      };
      broadCastMessage(sendData);

      await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status == 201) {
          document.getElementById("messageInput").value = "";
          setImage();
        }
      });
    }
  }

  function msToTime(date) {
    //Find the time difference between the two in seconds
    var seconds = date / 1000;

    //Find the difference in terms of days
    var d = Math.floor(seconds / (3600 * 24));
    //Find the difference in terms of hours
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    //Find the difference in terms of minutes
    var m = Math.floor((seconds % 3600) / 60);
    //Number of days that have passed
    var dDisplay = d > 0 ? d + (d == 1 ? " day ago " : " days ago ") : "";
    //Number of hours that have passed
    var hDisplay = h > 0 ? h + (h == 1 ? " hour ago " : " hours ago ") : "";
    //Number of minutes that have passed
    var mDisplay = m > 0 ? m + (m == 1 ? " minute ago " : " minutes ago ") : "";
    //If the message was sent one day ago return "Yesterday"
    if (d == 1) {
      dDisplay = "Yesterday";
      hDisplay = "";
      mDisplay = "";
    }
    if (dDisplay) {
      return dDisplay;
    } else if (hDisplay) {
      return hDisplay;
    } else if (mDisplay) {
      return mDisplay;
    } else {
      return "A few seconds ago";
    }
  }

  function renderTags(content) {
    let innerText = content.replace(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm,
      (links) => {
        return `<a  href="${links}" style={{color: var(--text-link-color)}} >${links}</a>`;
      }
    );
    return <div dangerouslySetInnerHTML={{ __html: innerText }}></div>;
  }

  return (
    <>
      {/* Image */}
      <input
        alt="uploadImage"
        type="file"
        accept="image/*"
        name="file"
        ref={inputFile}
        onChange={changeHandler}
        style={{ display: "none" }}
      />
      <div className={style.container}>
        <section className={style.titleContainer}>@{router.query.sub}</section>
        <main className={style.messageContainer} id="messageContainer">
          {message?.map(function (value) {
            return (
              <div key={value._id} className={style.message}>
                <img
                  src={value?.userInfo?.profilePicture}
                  alt="User Avatar"
                  className={style.userAvatar}
                />

                <span className={style.header}>
                  <p className={style.name}>{value?.userInfo?.displayName}</p>
                  <p className={style.date}>
                    {msToTime(Date.now() - value?.timestamp)}
                  </p>
                  <div className={style.messageText}>
                    {renderTags(value?.message)}
                  </div>
                  {value?.image && (
                    <img
                      loading="lazy"
                      src={value.image}
                      alt="Image"
                      className={style.image}
                    ></img>
                  )}
                </span>
              </div>
            );
          })}
        </main>
        <div
          id="emojiPicker"
          style={{ display: emojishow, position: "absolute", right: "10px" }}
        >
          <EmojiPicker
            show={emojishow}
            addEmoji={(event) =>
              (document.getElementById("messageInput").value += event.emoji)
            }
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className={style.formContainer}
        >
          {image && (
            <div className={style.imageUploadedContainer}>
              <div className={style.close} onClick={() => setImage("")}>
                &times;
              </div>
              <img
                loading="lazy"
                src={image}
                alt="Image"
                className={style.imageUploaded}
              ></img>
            </div>
          )}
          <div className={style.inputContainer}>
            <button
              aria-label="Upload image"
              title="Image"
              className={style.sendImageButton}
              onClick={(e) => {
                e.preventDefault();
                uploadImage();
              }}
            >
              <Image
                src="/assets/svgs/image.svg"
                alt="Image"
                width={20}
                height={20}
              ></Image>
            </button>

            <input
              placeholder={
                placeHolderOptions[
                  Math.floor(Math.random() * placeHolderOptions.length)
                ]
              }
              id="messageInput"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  document.getElementById("send").click();
                }
              }}
              required
            ></input>
            <button
              aria-label="Emoji"
              title="Emoji"
              className={style.sendImageButton}
              onClick={(e) => {
                e.preventDefault();
                showemoji();
              }}
            >
              <Image
                src="/assets/svgs/emoji.svg"
                alt="Image"
                width={20}
                height={20}
              ></Image>
            </button>
            <button
              aria-label="Send"
              title="Send"
              id="send"
              className={style.sendImageButton}
              type="submit"
            >
              <Image
                src="/assets/svgs/send.svg"
                alt="Image"
                width={20}
                height={20}
              ></Image>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export async function getServerSideProps({ res, query }) {
  const url = query.id;
  const channel = query.channel;
  const sub = query.sub;

  const dev = process.env.NODE_ENV !== "production";

  const server = dev ? "http://localhost:3000" : "https://squadz.in/";

  const response = await fetch(`${server}/api/getSquadInfo?id=${url}`);
  const data = await response.json();

  const message = await fetch(
    `${server}/api/getMessages?id=${url}&sub=${sub}&channel=${channel}`
  );
  const messages = await message.json();

  return { props: { data, messages } };
}
