import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context";
const Router = ({ path, component }) => {
  const [appState, setAppState] = useContext(AppContext);
  if (appState.path === path) {
    return component({
      appState: appState,
      setAppState: setAppState,
    });
  }
};

export default Router;
