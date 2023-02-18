import Header from "../Header";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import style from "./appLayout.module.css";

const LoginModal = dynamic(() => import("../../components/Modals/loginModal"), {
  ssr: false,
});
const LoginDeso = dynamic(() => import("../../components/Modals/loginDeso"));
const CreateCategory = dynamic(() =>
  import("../../components/Modals/createCategory")
);
const CreateChannel = dynamic(() =>
  import("../../components/Modals/createChannel")
);
const CreateSquad = dynamic(() =>
  import("../../components/Modals/createSquad")
);
const SignupModal = dynamic(
  () => import("../../components/Modals/signupModal"),
  {
    ssr: false,
  }
);
const JoinSquad = dynamic(() => import("../../components/Modals/joinSquad"));
const DeleteSquad = dynamic(() =>
  import("../../components/Modals/deleteSquad")
);
import SideBar from "../../components/Sidebar";
import Channels from "../../components/Channels";
import RightBar from "../../components/RightBar";

const Layout = (props) => {
  const router = useRouter();
  const displaySidebar = router.pathname == "/" || router.pathname == "/u/[id]";
  const displayChannels = router.pathname == "/u/[id]";
  return (
    <>
      <Header />
      <LoginModal />
      <SignupModal />
      <LoginDeso />
      <CreateSquad />
      <JoinSquad />
      <CreateCategory />
      <CreateChannel />
      <DeleteSquad />

      {displaySidebar ? (
        <div className={style.container}>
          <SideBar />
          {displayChannels && <Channels />}

          <main>{props.children}</main>
          {displayChannels && <RightBar />}
        </div>
      ) : (
        <main>{props.children}</main>
      )}
    </>
  );
};
export default Layout;
