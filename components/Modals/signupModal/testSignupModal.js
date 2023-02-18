/* Use this file an the others in the template
directory for a reference on what the other 
components should look like. */
import Modal from "../../Template/Modal";
import style from "./signupModal.module.css";
import Image from "next/image";

export default function SignupModal({ props }) {
  return (
    <Modal open={props.open}>
      <h1 className={style.title}>Sign up</h1>
      <div className={style.container}>
        <ul className={style.webthree}>
          <li>
            <Image
              width={15}
              height={15}
              src="/assets/svgs/deso.svg"
              alt="DeSo"
            ></Image>
            DeSo
          </li>
          <li>
            <Image
              width={15}
              height={15}
              src="/assets/svgs/metamask.svg"
              alt="Metamask"
            ></Image>
            Metamask
          </li>
          <li>
            <Image
              width={15}
              height={15}
              src="/assets/svgs/phantom.svg"
              alt="Phantom"
            ></Image>
            Phantom
          </li>
        </ul>
        <hr className={style.horizontal}></hr>
        <ul className={style.webtwo}>
          <li>
            <Image
              width={15}
              height={15}
              src="/assets/svgs/google.svg"
              alt="Google icon"
            ></Image>
            Google
          </li>
          <li className={style.unActive}>
            <Image
              width={15}
              height={15}
              src="/assets/svgs/microsoft.svg"
              alt="Microsoft"
            ></Image>
            Microsoft
          </li>
        </ul>
      </div>
      <p className={style.goToSignup}>
        Already have an account? Click <a href="#">here</a> to login.
      </p>
    </Modal>
  );
}
