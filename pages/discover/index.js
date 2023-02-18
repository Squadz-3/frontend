import Head from "next/head";
import style from "../../styles/Discover.module.css";
import { useRouter } from "next/router";
import Squadz from "../../components/Template/Squadz";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Discover({ data }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [desc, setDesc] = useState("");
  const [value, setValue] = useState(data);
  const [sort, setSort] = useState("hot");
  const [gate, setGate] = useState("");

  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    addRoutePath("search", searchTerm);
    updateValue();
  }, [searchTerm]);
  useEffect(() => {
    addRoutePath("gate", gate);
    updateValue();
  }, [gate]);
  useEffect(() => {
    addRoutePath("desc", desc);
    updateValue();
  }, [desc]);
  useEffect(() => {
    addRoutePath("sort", sort);
    updateValue();
  }, [sort]);

  async function updateValue() {
    const body = {
      searchTerm: searchTerm,
      desc: document.getElementById("squadDescription").value,
      sort: sort,
      gate: gate,
    };
    const response = await fetch(`/api/getHotSquadz/`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    setValue(data);
  }

  function addRoutePath(route, value) {
    router.push(
      {
        query: {
          ...router.query,
          [route]: value,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  }
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
        <title>Squadz | Discover</title>
      </Head>
      <main className={style.banner}>
        <h1 className={style.title}>Discover</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchTerm(document.getElementById("searchSquad").value);
          }}
        >
          <div className={style.search}>
            <input
              placeholder="Find your Squad"
              autoComplete="off"
              type="text"
              required
              autoFocus
              id="searchSquad"
              maxLength={40}
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  setSearchTerm(document.getElementById("searchSquad").value);
                }
              }}
            ></input>
          </div>
          <button
            aria-label="Search"
            title="Search"
            className={style.searchBtn}
            type="submit"
          >
            Let&apos;s Go
          </button>
        </form>
      </main>

      <section className={style.container}>
        <div>
          <h1 className={style.subText}>Filter</h1>
          <form
            className={style.filter}
            onSubmit={(e) => {
              e.preventDefault();
              if (document.getElementById("squadDescription").value) {
                setDesc(document.getElementById("squadDescription").value);
                addRoutePath(
                  "desc",
                  document.getElementById("squadDescription").value
                );
              }
            }}
          >
            <p>Sort by: </p>
            <ul>
              <li
                onClick={() => setSort("hot")}
                className={sort == "hot" ? style.activeList : ""}
              >
                Hot
              </li>
              <li
                onClick={() => setSort("latest")}
                className={sort == "latest" ? style.activeList : ""}
              >
                Latest
              </li>
            </ul>
            <textarea
              rows={8}
              cols={45}
              placeholder="Squad Description"
              id="squadDescription"
            ></textarea>
            <p>Gating details: </p>
            <ul>
              <li
                onClick={() => setGate("free")}
                className={gate == "free" ? style.activeList : ""}
              >
                Free
              </li>
              <li
                onClick={() => setGate("dao")}
                className={gate == "dao" ? style.activeList : ""}
              >
                Dao
              </li>
              <li
                onClick={() => setGate("nft")}
                className={gate == "nft" ? style.activeList : ""}
              >
                NFT
              </li>
            </ul>

            <button aria-label="Search" title="Search" type="submit">
              Let&apos;s go
            </button>
          </form>
        </div>
        <div>
          <h2 className={style.subText}>Hot Squadz</h2>
          <h4 className={style.underText}>
            Displaying <i>{value.hot?.length < 10 ? value.hot?.length : 10}</i>{" "}
            out of <i>{value.hot?.length}</i> results
          </h4>
          {value != null &&
            value.hot?.slice(0, 10).map(function (value) {
              return <Squadz value={value} key={value._id}></Squadz>;
            })}
        </div>
      </section>
      {/* =====  Banner  ====== */}
      <section className={style.slogan}>
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
              <a href="https://diamondapp.com/u/Squadz?feedTab=Hot">Diamond</a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export async function getServerSideProps({ query, res }) {
  const search = query.search;
  const desc = query.desc;
  const sort = query.sort;
  const gate = query.gate;

  const dev = process.env.NODE_ENV !== "production";

  const server = dev ? "http://localhost:3000/" : "https://squadz.in";
  // Fetch data from external API
  const body = {
    searchTerm: search,
    desc: desc,
    sort: sort,
    gate: gate,
  };
  const response = await fetch(`${server}/api/getHotSquadz`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await response.json();

  // Pass data to the page via props
  return { props: { data } };
}
