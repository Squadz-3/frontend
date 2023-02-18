import style from "../styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import { modalContext } from "../contexts/modalProvider";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { loginState, signupState } = useContext(modalContext);
  const [login, setLogin] = loginState;
  const [signup, setSignup] = signupState;

  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    window.removeEventListener("transitionend", handler);
  }, []);

  function downloadPWA() {
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  }
  return (
    <>
      <Head>
        <title>Squadz | Home</title>
      </Head>
      <div className={style.background}>
        <img
          className={style.vector}
          src="/assets/svgs/vector.svg"
          alt="Vector background"
          loading="eager"
        ></img>

        {/* ===== Hero ===== */}
        <div className={style.container}>
          <section className={style.hero}>
            <div className={style.left}>
              <h1 name="Main text">Your NFT Community Portal</h1>
              <h2 name="Sub text">
                Build, Engage Reward! Build an engaged community by rewarding
                micro-actions all in one platform!
              </h2>
              <button
                name="Call to action"
                aria-label="Join"
                title="Join"
                onClick={() => setSignup(true)}
              >
                Join
              </button>
            </div>
            <div className={style.right}>
              <img
                name="Laptop"
                src="/assets/svgs/laptop.svg"
                alt="Laptop"
                width={500}
                loading="eager"
              ></img>
            </div>
          </section>

          {/* ===== Features ===== */}

          <section className={style.features}>
            <h2>Features</h2>
            <ul>
              <li>
                <Image
                  width={150}
                  height={150}
                  src="/assets/svgs/key.svg"
                  alt="Key"
                ></Image>
                <h3>Gated Communities</h3>
                <p>
                  Gate your communities with NFTs, Social/DAO Tokens or even a
                  social follow!
                </p>
              </li>
              <li>
                <Image
                  width={150}
                  height={150}
                  src="/assets/svgs/lock.svg"
                  alt="Lock"
                ></Image>
                <h3>Secure Communications</h3>
                <p>Conversations are encrypted and stored on the blockchain!</p>
              </li>
              <li>
                <Image
                  width={150}
                  height={150}
                  src="/assets/svgs/clogs.svg"
                  alt="Clog"
                ></Image>
                <h3> Engaged Community</h3>
                <p>
                  Reward your community for micro-actions & build an engaged
                  community!
                </p>
              </li>
              <li>
                <Image
                  width={150}
                  height={150}
                  src="/assets/svgs/device.svg"
                  alt="Device"
                ></Image>
                <h3> Access across Devices</h3>
                <p>Engage your community across desktop & mobile!</p>
              </li>
            </ul>
          </section>
          {/* =====  Banner  ====== */}
          <section className={style.banner}>
            <h1>Bring your squad together with Squadz</h1>
          </section>
          {/* ===== Download ===== */}
          <section className={style.download}>
            <div className={style.downloadLeft}>
              <h1>Stay connected on the go!</h1>
              <p>Install Squadz for mobile and desktop</p>
            </div>
            <div className={style.downloadRight}>
              <button
                aria-label="Download"
                title="Download"
                onClick={() => downloadPWA()}
              >
                Download
              </button>
            </div>
          </section>
        </div>
        {/* ===== Footer ===== */}

        <footer className={style.footer}>
          <div>
            <Image
              width={208}
              height={47}
              src="/assets/images/logo.png"
              alt="Logo"
            ></Image>
          </div>
          <div>
            <h2>Join</h2>
            <ul>
              <li onClick={() => setLogin(true)}>Login</li>
              <li onClick={() => setSignup(true)}>Sign up</li>
            </ul>
          </div>
          <div>
            <h2>Policies</h2>
            <ul>
              <li>Terms</li>
              <li>Privacy</li>
            </ul>
          </div>
          <div>
            <h2>Follow us</h2>
            <ul>
              <li>Twitter</li>
              <li>
                <a href="https://diamondapp.com/u/Squadz?feedTab=Hot">
                  Diamond
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}
