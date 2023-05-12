import { useContext } from "react";
import { AppContext } from "../../contexts";
const Route = ({ path, component }) => {
  const [appState, setAppState] = useContext(AppContext);
  if (appState.path === path) {
    return component({
      appState: appState,
      setAppState: setAppState,
    });
  }
};

export default Route;
