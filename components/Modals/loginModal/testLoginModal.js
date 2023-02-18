/* Use this file an the others in the template
directory for a reference on what the other 
components should look like. */
import Modal from "../../Template/Modal";
import style from "./loginModal.module.css";
import Image from "next/image";

export default function LoginModal() {
  return (
    <Modal>
      <h1 className={style.title}>Login</h1>
      <div className={style.container}>
        <ul className={style.webthree}>
          <li>
            <Image
              width={15}
              height={15}
              src="/assets/svgs/deso.svg"
              alt="DeSo icon"
            ></Image>
            DeSo
          </li>
          <li>
            <Image
              width={15}
              height={15}
              src="/assets/svgs/metamask.svg"
              alt="Metamask icon"
            ></Image>
            Metamask
          </li>
          <li>
            <Image
              width={15}
              height={15}
              src="/assets/svgs/phantom.svg"
              alt="Phantom icon"
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
              alt="Microsoft icon"
            ></Image>
            Microsoft
          </li>
        </ul>
      </div>
      <p className={style.goToSignup}>
        Don&apos;t have an account? Click <a href="#">here</a> to sign up.
      </p>
    </Modal>
  );
}
