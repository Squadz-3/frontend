import style from "./memberItem.module.css";

export default function MemberItem({ value }) {
  return (
    <div className={style.container}>
      <img
        className={style.memberItem}
        src={value.profilePicture}
        alt="Profile Picture"
        width={40}
        height={40}
      ></img>
      <span className={style.memberName}>{value.displayName}</span>
    </div>
  );
}
