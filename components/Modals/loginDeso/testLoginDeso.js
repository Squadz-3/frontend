/* Use this file an the others in the template
directory for a reference on what the other 
components should look like. */
import style from "./loginDeso.module.css";

export default function TestLoginDeso(props) {
  const storyBook = props.sampleTextProp;
  return <div className={style.base}>{storyBook}</div>;
}
