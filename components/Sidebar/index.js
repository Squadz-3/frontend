import { useEffect, useContext } from "react";
import SideItem from "../SideItem";
import style from "./sideBar.module.css";
import { squadContext } from "../../contexts/squadProvider";

export default function SideBar() {
  const { communityList } = useContext(squadContext);
  const [community, setCommunity] = communityList;

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("SquadData"))) {
      getCommunityList();
    }
  }, []);

  async function getCommunityList() {
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
  }

  return (
    <nav className={style.container}>
      {community?.map(function (value) {
        return <SideItem key={value._id} value={value} />;
      })}
    </nav>
  );
}
