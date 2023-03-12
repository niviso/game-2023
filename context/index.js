import React, { useState } from "react";

const AppContext = React.createContext([{}, () => {}]);
const AppProvider = (props) => {
  const [AppState, setAppState] = useState({
    path: "select",
  });

  return (
    <AppContext.Provider value={[AppState, setAppState]}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
