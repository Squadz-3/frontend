import style from "./rightBar.module.css";
import MemberItem from "../MemberItem";
import { useContext, useEffect, useState } from "react";
import { squadContext } from "../../contexts/squadProvider";

export default function RightBar() {
  const { squadValue } = useContext(squadContext);
  const [value] = squadValue;
  const [admins, setAdmins] = useState();
  const [members, setMembers] = useState();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("SquadData"))) {
      if (value && value != "Loading") {
        getMembers(value.admins, "admin");
        getMembers(value.members, "member");
      }
    } else {
      return null;
    }
  }, [value]);

  async function getMembers(value, type) {
    const data = {
      members: value,
    };
    const response = await fetch(`/api/getMembers/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (type == "admin") {
      setAdmins(result);
    } else {
      setMembers(result);
    }
  }
  return (
    <div className={style.container}>
      <h3 className={style.label}>Admin - {admins?.length}</h3>
      {admins &&
        admins?.map(function (value) {
          return <MemberItem value={value} key={value._id} />;
        })}
      <h3 className={style.label}>Member - {members?.length}</h3>
      {members &&
        members?.map(function (value) {
          return <MemberItem value={value} key={value._id} />;
        })}
    </div>
  );
}
