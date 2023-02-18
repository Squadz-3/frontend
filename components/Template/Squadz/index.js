import Image from "next/image";
import style from "./squadz.module.css";
import { useContext } from "react";
import { modalContext } from "../../../contexts/modalProvider";
export default function Squadz({ value }) {
  const { joinSquad, joinSquadDetail } = useContext(modalContext);
  const [state, setState] = joinSquad;
  const [squad, setSquad] = joinSquadDetail;
  return (
    <div
      className={style.squad}
      onClick={() => {
        setState(true);
        setSquad(value);
      }}
    >
      <Image
        className={style.squadBanner}
        src={value.banner}
        alt="Banner"
        height={150}
        width={250}
      ></Image>
      <span className={style.container}>
        <div className={style.containerTitle}>
          <Image
            className={style.profile}
            src={value.profile}
            alt="Profile"
            width={30}
            height={30}
          ></Image>
          <h1 className={style.name}>{value.name}</h1>
          <h2 className={style.details}>
            {" "}
            &#8226; {value.members.length}{" "}
            {value.members.length == 1 ? "member" : "members"}
          </h2>
        </div>
        <div className={style.descriptionContainer}>
          <p className={style.description}>{value.description}</p>
        </div>

        <div
          className={
            value.gatingDetails.includes("nft")
              ? style.gateNFT
              : value.gatingDetails.includes("dao")
              ? style.gateDao
              : style.gateFree
          }
        >
          {value.gatingDetails.includes("nft")
            ? "NFT"
            : value.gatingDetails.includes("dao")
            ? "Dao"
            : "Free"}
        </div>
      </span>
    </div>
  );
}
