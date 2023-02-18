import style from "./createSquad.module.css";
import Modal from "../../Template/Modal";
import { modalContext } from "../../../contexts/modalProvider";
import { useContext, useState, useRef, useEffect } from "react";
import DesoApi from "../../../pages/api/DeSo";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CreateSquad() {
  const { createSquad } = useContext(modalContext);
  const router = useRouter();

  const [state, setState] = createSquad;

  const [current, setCurrent] = useState(0);

  const inputFile = useRef(null);
  const inputFile2 = useRef(null);
  const deso = new DesoApi();

  /* ====== Community Data ===== */
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [profile, setProfile] = useState("/assets/svgs/upload.svg");
  const [banner, setBanner] = useState("");
  const [restriction, setRestriction] = useState("");

  /* ====== Extra Data ===== */
  const [value, setValue] = useState();
  const [currency, setCurrency] = useState("deso");
  const [nfts, setNFTS] = useState();

  const stepsDescription = [
    "Let people know what your squad is about with a name and description.",
    "Customize your squad with a profile picture and a banner.",
    "Restrict your squad with NFT gating or make it free for everybody to join.",
  ];

  //Set the selected file as the image url
  const changeHandler = async (event) => {
    //Get the selected image
    const img = event.target.files[0];
    const link = await getImageUrl(img);
    setProfile(link);
  };
  //Set the selected file as the image url
  const changeHandler2 = async (event) => {
    //Get the selected image
    const img = event.target.files[0];
    document.getElementById("uploadBanner").innerText =
      "Uploading...This might take a while";
    const link = await getImageUrl(img);

    setBanner(link);
    document.getElementById("uploadBanner").innerText = "Done uploading";
    document.getElementById("banner").style.display = "block";
  };

  async function intialize() {
    const user = localStorage.getItem("deso_user_key");
    await deso.getJwt(user);
  }
  useEffect(() => {
    intialize();
  }, []);

  async function getImageUrl(result) {
    const user = localStorage.getItem("deso_user_key");
    const JWT = await deso.getJwt(user);
    const link = await deso.uploadImage(user, JWT, result);
    return link;
  }

  async function getNFTForUser() {
    const user = localStorage.getItem("deso_user_key");
    const response = await deso.getUserNFT(user);
    setNFTS(response);
  }

  const steps = [
    <>
      <input
        className={style.input}
        onChange={(e) => setName(e.target.value)}
        placeholder="Squad Name"
        value={name}
        maxLength={50}
        min={2}
        max={50}
        required
        autoFocus
      ></input>
      <textarea
        className={style.textarea}
        onChange={(e) => setDescription(e.target.value)}
        rows={8}
        placeholder="Squad Description"
        value={description}
        maxLength={1500}
        minLength={10}
        required
      ></textarea>
    </>,
    <>
      <div className={style.container}>
        <input
          alt="uploadImage"
          type="file"
          accept="image/*"
          name="file"
          ref={inputFile}
          id="inputFile"
          onChange={changeHandler}
          style={{ display: "none" }}
        />
        <input
          alt="uploadImage"
          type="file"
          accept="image/*"
          name="file"
          ref={inputFile2}
          onChange={changeHandler2}
          style={{ display: "none" }}
        />

        <img
          className={style.image}
          onClick={() => inputFile.current.click()}
          src={profile}
          alt="Image uploaded"
        ></img>
      </div>
      <div className={style.upload} onClick={() => inputFile2.current.click()}>
        <p id="uploadBanner">Upload Banner</p>
      </div>

      <img
        id="banner"
        className={style.banner}
        src={banner}
        alt="Image uploaded"
      ></img>
    </>,
    <>
      <div
        className={restriction == "free" ? style.active : style.option}
        onClick={() => setRestriction("free")}
      >
        <Image
          src="/assets/svgs/check.svg"
          alt="Free"
          width={32}
          height={30}
          className={style.optionImage}
        ></Image>
        <span>
          <h2>Free for all</h2>
          <p>Allow anybody to join and access your community.</p>
        </span>
      </div>
      <div
        className={
          restriction.substring(0, 3) == "dao" ? style.active : style.option
        }
        onClick={() => setRestriction("dao")}
      >
        <Image
          src="/assets/svgs/coin.svg"
          alt="Coin"
          width={35}
          height={35}
          className={style.optionImage}
        ></Image>
        <span>
          <h2>DeSo Coin Gated</h2>
          <p>Restrict access to anybody that owns some of your DeSo coin.</p>
        </span>
      </div>
      {restriction.substring(0, 3) == "dao" && (
        <>
          <p className={style.minDao}>Min amount to hold: </p>
          <input
            min={0}
            className={style.minDaoText}
            type="number"
            onChange={(e) => {
              setValue(Math.abs(e.target.value));
              setRestriction(
                "dao:" + Math.abs(e.target.value) + ":" + currency
              );
            }}
            required
          ></input>
          <select
            id="selectCurrency"
            className={style.menu}
            onChange={(e) => {
              setCurrency(e.target.value);
              setRestriction("dao:" + value + ":" + e.target.value);
            }}
          >
            <option value="deso">DeSo</option>
            <option value="usd">USD</option>
          </select>
        </>
      )}
      <div
        className={
          restriction.substring(0, 3) == "nft" ? style.active : style.option
        }
        onClick={() => {
          setRestriction("nft:any");
          getNFTForUser();
        }}
      >
        <Image
          src="/assets/svgs/image.svg"
          alt="Images"
          width={30}
          height={30}
          className={style.optionImage}
        ></Image>
        <span>
          <h2>NFT Gated</h2>
          <p>Restrict access to anybody that owns any one of your NFTs.</p>
        </span>
      </div>
      {restriction.substring(0, 3) == "nft" && (
        <>
          <h3 style={{ marginTop: "1vh", marginBottom: "1vh" }}>
            Select an NFT
          </h3>
          <ul className={style.NFTList}>
            <li
              key={"NFTAny"}
              className={style.textNFT}
              onClick={() => setRestriction("nft:any")}
              style={
                restriction == "nft:any"
                  ? { outline: "2px solid var(--accent-color)" }
                  : {}
              }
            >
              Any
            </li>
            {nfts &&
              Object.values(nfts)?.map(function (value, index) {
                if (value.PostEntryResponse.ImageURLs) {
                  return (
                    <li
                      key={Object.keys(nfts)[index]}
                      className={style.imageNFT}
                      onClick={() =>
                        setRestriction("nft:" + Object.keys(nfts)[index])
                      }
                      style={
                        restriction == "nft:" + Object.keys(nfts)[index]
                          ? { outline: "2px solid var(--accent-color)" }
                          : {}
                      }
                    >
                      <img
                        src={value.PostEntryResponse.ImageURLs[0]}
                        alt="NFT Image"
                        width={30}
                        height={30}
                        loading="lazy"
                      ></img>
                    </li>
                  );
                } else {
                  return (
                    <li
                      key={"nft:" + Object.keys(nfts)[index]}
                      className={style.textNFT}
                      onClick={() =>
                        setRestriction("nft:" + Object.keys(nfts)[index])
                      }
                      style={
                        restriction == "nft:" + Object.keys(nfts)[index]
                          ? { outline: "2px solid var(--accent-color)" }
                          : {}
                      }
                    >
                      {value.PostEntryResponse.Body.substring(0, 6) + "..."}
                    </li>
                  );
                }
              })}
          </ul>
        </>
      )}
    </>,
  ];
  const isLastStep = current === steps.length - 1;

  function generateUID(length) {
    var charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  return (
    <Modal open={state} onClose={() => setState(false)}>
      <h1 className={style.title}>Create your Squad</h1>
      <p className={style.description}>{stepsDescription[current]} </p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (!isLastStep) {
            if (current == 1) {
              if (!banner || !profile) {
                document.getElementById("errorMessage").innerText =
                  "Must upload profile and banner";
                return;
              }
            } else if (current == 2) {
              if (!restriction) {
                document.getElementById("errorMessage").innerText =
                  "Must select one option";
                return;
              }
            }
            setCurrent(current + 1);
            document.getElementById("errorMessage").innerText = "";
          } else {
            document.getElementById("nextButton").innerText = "Creating...";
            const uid = generateUID(15);
            const data = {
              _id: uid,
              name: name,
              description: description,
              profile: profile,
              banner: banner,
              ownerDeSo: localStorage.getItem("deso_user_key"),
              members: [],
              admins: [JSON.parse(localStorage.getItem("SquadData"))._id],
              channels: [
                {
                  name: "Text Channels",
                  subchannels: [
                    {
                      name: "General",
                      description: "general",
                      readOnly: false,
                      restriction: "none",
                      private: false,
                    },
                  ],
                },
              ],
              gatingDetails: restriction,
              timestamp: Date.now(),
            };
            await fetch("/api/createSquad", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }).then(async (res) => {
              if (res.status == 201) {
                setState(false);
                const data = {
                  id: JSON.parse(localStorage.getItem("SquadData"))._id,
                  squad: uid,
                };
                await fetch("/api/joinSquad", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                }).then((res) => {
                  if (res.status == 200) {
                    setName("");
                    setDescription("");
                    setBanner("");
                    setCurrent(0);
                    setProfile("");
                    setRestriction("");

                    router.push(
                      `/u/${uid}?channel=Text%20Channels&sub=General`
                    );
                  }
                });
              } else {
                res
                  .text()
                  .then(
                    (text) =>
                      (document.getElementById("errorMessage").innerText = text)
                  );
              }
            });
          }
        }}
      >
        {steps[current]}

        {current != 0 && (
          <button
            type="button"
            onClick={() => {
              setCurrent(current - 1);
              document.getElementById("errorMessage").innerText = "";
            }}
            className={style.backButton}
          >
            Back
          </button>
        )}

        <button id="nextButton" type="submit" className={style.nextButton}>
          {isLastStep ? "Create" : "Next"}
        </button>
      </form>

      <p id="errorMessage" className={style.error}></p>
    </Modal>
  );
}
