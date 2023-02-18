import React, { useState } from "react";

const intialState = "Loading";

export const squadContext = React.createContext();

export default function SquadProvider({ children }) {
  const [data, setData] = useState(intialState);
  const [communityList, setCommunityList] = useState();
  return (
    <squadContext.Provider
      value={{
        squadValue: [data, setData],
        communityList: [communityList, setCommunityList],
      }}
    >
      {children}
    </squadContext.Provider>
  );
}
