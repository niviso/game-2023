import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context";
const Router = ({ path, component }) => {
  const [appState, setAppState] = useContext(AppContext);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("navigate", onLocationChange);
    return () => window.removeEventListener("navigate", onLocationChange);
  }, []);
  return currentPath === path
    ? component({
        route: window.location.pathname,
        appState: appState,
        setAppState: setAppState,
      })
    : null;
};

export default Router;
