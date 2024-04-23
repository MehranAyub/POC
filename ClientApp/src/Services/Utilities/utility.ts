import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { AppState } from "../../Redux/Reducer/rootReducer";

const SyncToken = () => {
  const token = useSelector((state: AppState) => state.authReducer.token);

  useEffect(() => {
    console.log("token passing", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [token]);

  return null; // this component does not render anything
};

export default SyncToken;
