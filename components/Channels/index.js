import style from "./channels.module.css";
import { useContext, useEffect } from "react";
import { squadContext } from "../../contexts/squadProvider";
import { modalContext } from "../../contexts/modalProvider";
import { useRouter } from "next/router";
import Image from "next/image";
export default function Channels() {
  const { squadValue, communityList } = useContext(squadContext);
  const {
    createCategory,
    createChannel,
    createChannelName,
    deleteSquad,
    deleteSquadText,
  } = useContext(modalContext);
  const [value] = squadValue;
  const router = useRouter();
  const [open, setOpen] = createCategory;
  const [showDelete, setShowDelete] = deleteSquad;
  const [text, setText] = deleteSquadText;
  const [openChannel, setOpenChannel] = createChannel;
  const [channel, setChannel] = createChannelName;
  const [community, setCommunity] = communityList;
  const isAdmin = value?.admins?.includes(
    JSON.parse(localStorage.getItem("SquadData"))._id
  );

  function changeChannel(value, main) {
    router.push(
      {
        query: {
          ...router.query,
          channel: main,
          sub: value,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  }

  function displayMenu() {
    const Caret = document.getElementById("Caret");

    if (Caret.style.transform == "translate(-50%, -50%) rotate(180deg)") {
      Caret.style.transform = "translate(-50%, -50%) rotate(0deg)";

      document.getElementById("dropdown").style.display = "none";
      document.getElementById("dropdown").style.opacity = "0";
    } else {
      Caret.style.transform = "translate(-50%, -50%) rotate(180deg)";
      document.getElementById("dropdown").style.display = "block";
      document.getElementById("dropdown").style.opacity = "100";
    }
  }

  async function leaveSquad() {
    const data = {
      user: JSON.parse(localStorage.getItem("SquadData"))._id,
      id: router.query.id,
    };
    fetch("/api/leaveSquad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async () => {
      await fetch(
        `/api/getSquadz?user=${
          JSON.parse(localStorage.getItem("SquadData"))._id
        }`,
        {
          headers: {
            "Cache-Control": "s-maxage=60",
          },
        }
      ).then(async (res) => {
        const data = await res.json();
        setCommunity(data);
      });
      router.push("/");
    });
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
  }

  return (
    <section className={style.container}>
      <section className={style.name}>
        <p>{value.name}</p>{" "}
        <Image
          aria-label="Show more"
          title="Show more"
          width={25}
          height={25}
          className={style.caret}
          src="/assets/svgs/triangle-down.svg"
          alt="Caret"
          id="Caret"
          onClick={() => displayMenu()}
        ></Image>
      </section>

      <div className={style.dropdown} id="dropdown">
        {isAdmin && (
          <ul>
            <li
              key={"SettingsAdmin"}
              onClick={() => router.push(`/settings/squad/${router.query.id}`)}
            >
              Settings
            </li>
            <li key={"CopyLinkAdmin"} onClick={() => copyLink()}>
              Copy Link
            </li>
            <li key={"CreateCategoryAdmin"} onClick={() => setOpen(true)}>
              Create Category
            </li>
            <li
              key={"DeleteSquadAdmin"}
              onClick={() => {
                setShowDelete(true);
                setText(value.name);
              }}
            >
              Delete Squad
            </li>
          </ul>
        )}
        {!isAdmin && (
          <ul>
            <li key={"CopyLinkNotAdmin"} onClick={() => copyLink()}>
              Copy Link
            </li>
            <li key={"LeaveSquadNotAdmin"} onClick={() => leaveSquad()}>
              Leave Squad
            </li>
          </ul>
        )}
      </div>

      <img
        src={value.banner}
        loading="lazy"
        className={style.banner}
        alt="Banner"
      ></img>

      {value &&
        value?.channels?.map(function (data, index) {
          return (
            <div key={data.name + index}>
              <h2 className={style.channel}>{data.name}</h2>
              {isAdmin && (
                <Image
                  aria-label="Add channel"
                  title="Add channel"
                  src="/assets/svgs/add.svg"
                  alt="Add channel"
                  width={20}
                  height={20}
                  className={style.channelButton}
                  onClick={() => {
                    setChannel(data.name);
                    setOpenChannel(true);
                  }}
                ></Image>
              )}
              {value.channels[index].subchannels.map(function (data) {
                return (
                  <p
                    key={value.channels[index].name}
                    className={style.subChannel}
                    onClick={() =>
                      changeChannel(data.name, value.channels[index].name)
                    }
                  >
                    # {data.name}
                  </p>
                );
              })}
            </div>
          );
        })}
    </section>
  );
}
