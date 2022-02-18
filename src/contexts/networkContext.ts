import { createContext } from "react";

export const networkContext = createContext<{network: any, setNetwork: (p: any) => any}>({network: {}, setNetwork: p => p})