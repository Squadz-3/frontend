import style from "./createSquad.module.css";

export default function TestCreateSquad(props) {
  const storyBook = props.sampleTextProp;
  return <div className={style.base}>{storyBook}</div>;
}
