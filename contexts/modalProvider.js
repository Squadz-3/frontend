import React, { useState } from "react";

const intialState = false;

export const modalContext = React.createContext();

export default function ModalProvider({ children }) {
  const [loginModal, loginModalState] = useState(intialState);
  const [signupModal, signupModalState] = useState(intialState);
  const [loginDeso, loginDesoState] = useState(intialState);
  const [loginDesoText, setLoginDesoText] = useState("loading");
  const [createSquad, createSquadState] = useState(intialState);
  const [joinSquad, setJoinSquad] = useState(intialState);
  const [joinSquadDetail, setJoinSquadDetail] = useState("loading");
  const [createCatgeory, setCreateCategory] = useState(intialState);
  const [createChannel, setCreateChannel] = useState(intialState);
  const [createChannelName, setCreateChannelName] = useState("loading");
  const [deleteSquad, setDeleteSquad] = useState(intialState);
  const [deleteSquadText, setDeleteSquadText] = useState(intialState);
  return (
    <modalContext.Provider
      value={{
        loginState: [loginModal, loginModalState], // Login modal
        signupState: [signupModal, signupModalState], //Sign up modal
        loginDeso: [loginDeso, loginDesoState], // Login Deso
        loginDesoText: [loginDesoText, setLoginDesoText], //Login Deso text
        createSquad: [createSquad, createSquadState], //Create sqaud
        joinSquad: [joinSquad, setJoinSquad], //Join squad
        joinSquadDetail: [joinSquadDetail, setJoinSquadDetail],
        createCategory: [createCatgeory, setCreateCategory],
        createChannel: [createChannel, setCreateChannel],
        createChannelName: [createChannelName, setCreateChannelName],
        deleteSquad: [deleteSquad, setDeleteSquad],
        deleteSquadText: [deleteSquadText, setDeleteSquadText],
      }}
    >
      {children}
    </modalContext.Provider>
  );
}
