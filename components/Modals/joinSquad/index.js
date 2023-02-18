import style from "./joinSquad.module.css";
import Modal from "../../Template/Modal";
import { modalContext } from "../../../contexts/modalProvider";
import { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import DesoApi from "../../../pages/api/DeSo";

export default function JoinSquad() {
  const { joinSquad, joinSquadDetail, loginDeso, loginDesoText } =
    useContext(modalContext);
  const [state, setState] = joinSquad;

  const [login, setLoginWithDeso] = loginDeso;
  const [loginText, setLoginWithText] = loginDesoText;
  const [value] = joinSquadDetail;
  const [error, setError] = useState("");
  const router = useRouter();
  const deso = new DesoApi();

  async function join() {
    setState(false);
    const data = {
      id: JSON.parse(localStorage.getItem("SquadData"))._id,
      squad: value._id,
    };
    await fetch("/api/joinSquad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status == 200) {
        router.push(
          `/u/${value._id}?channel=${value.channels[0].name}&sub=${value.channels[0].subchannels[0].name}`
        );
      }
    });
  }

  async function checkIfAllowed() {
    document.getElementById("joinSquad").innerText = "Checking...";
    if (value.gatingDetails == "free") {
      join();
    } else if (value.gatingDetails.substring(0, 3) == "nft") {
      //Check if user is logged in with DeSo
      if (localStorage.getItem("deso_user_key")) {
        //Verify if user owns required NFT.
        const result = await deso.verifyGate(
          "nft",
          localStorage.getItem("deso_user_key"),
          value.gatingDetails?.split(":")[1],
          "",
          value.ownerDeSo
        );

        if (result == true) {
          //User owns that NFT
          join();
        } else {
          //User doesn't own that NFT
          setError("Must own NFT to join this squad");
        }
      } else {
        /*User is not logged with DeSo 
        We close this modal and open the log in 
        with DeSo modal */
        setState(false);
        setLoginWithText("join this community");
        setLoginWithDeso(true);
      }
    } else if (value.gatingDetails.substring(0, 3) == "dao") {
      if (localStorage.getItem("deso_user_key")) {
        //Verify if user owns required amount of Dao coins
        const result = await deso.verifyGate(
          "dao",
          localStorage.getItem("deso_user_key"),
          "",
          value.gatingDetails?.split(":")[1],
          value.gatingDetails?.split(":")[2],
          value.ownerDeSo
        );
        if (result == true) {
          //User owns that NFT
          join();
        } else {
          //User doesn't own that NFT
          setError(
            `Must own required amount of Dao coin to join. Currently own ${result}`
          );
        }
      } else {
        setState(false);
        setLoginWithText("join this community");
        setLoginWithDeso(true);
      }
    }
  }
  return (
    <Modal open={state} onClose={() => setState(false)}>
      <div className={style.container}>
        <img src={value?.banner} alt="Banner" className={style.banner}></img>
        <Image
          width={100}
          height={100}
          className={style.profile}
          src={value.profile}
          alt="Profile"
        ></Image>
      </div>
      <div className={style.textContainer}>
        <h1 className={style.title}>{value.name}</h1>
        <p className={style.desc}>
          {value.description?.substring(0, 240)}
          {value.description?.length > 240 ? "..." : ""}
        </p>
        <br></br>
        <p>
          {value.members?.length} member{value.members?.length == 1 ? "" : "s"}{" "}
          &#8226;{" "}
          {value.gatingDetails?.substring(0, 3) == "nft"
            ? "Must own an NFT to join"
            : value.gatingDetails?.substring(0, 3) == "dao"
            ? `Must own ${
                value.gatingDetails?.split(":")[1]
              } ${value.gatingDetails
                ?.split(":")[2]
                .toUpperCase()} worth of this Dao coin.`
            : "Free to join"}
        </p>

        <div className={style.joinContainer}>
          {value.gatingDetails?.substring(0, 3) == "nft" ? (
            <button
              style={{ marginRight: "10px", marginTop: "10px" }}
              onClick={() =>
                router.push(
                  `https://nftz.me/nft/${value.gatingDetails?.split(":")[1]}`
                )
              }
            >
              Buy NFT
            </button>
          ) : (
            value.gatingDetails?.substring(0, 3) == "dao" && (
              <button
                style={{ marginRight: "10px", marginTop: "10px" }}
                onClick={async () =>
                  router.push(
                    `https://diamondapp.com/u/${await deso.getUsername(
                      value.ownerDeSo
                    )}?feedTab=Following&tab=creator-coin`
                  )
                }
              >
                Buy Dao
              </button>
            )
          )}
          <button
            style={{ marginRight: "10px", marginTop: "10px" }}
            onClick={() => setState(false)}
          >
            Cancel{" "}
          </button>
          <button onClick={() => checkIfAllowed()} id="joinSquad">
            Join Squad
          </button>
        </div>
        <p className={style.error}>{error}</p>
      </div>
    </Modal>
  );
}
