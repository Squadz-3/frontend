import Image from "next/image";
import Link from "next/link";
import style from "./sideItem.module.css";

export default function SideItem({ value }) {
  return (
    <Link
      href={`/u/${value?._id}?channel=${value?.channels[0].name}&sub=${value?.channels[0].subchannels[0].name}`}
    >
      <div className={style.container}>
        <Image
          className={style.navItem}
          src={value.profile}
          alt="Profile"
          width={50}
          height={50}
        ></Image>
        <span className={style.navName}>{value.name}</span>
      </div>
    </Link>
  );
}
