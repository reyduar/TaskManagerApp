import { useContext } from "react";
import { GlobalContext } from "../contexts";

/**
 *
 */

export const useGlobal = () => useContext(GlobalContext);
