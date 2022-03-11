import { createContext } from "react";

interface INetworkContext {
    network: any,
    setNetwork: (p: any) => any,
    numberOfPendingRequests: number,
}

export const networkContext = createContext<INetworkContext>({
    network: {}, 
    setNetwork: p => p, 
    numberOfPendingRequests: 0
})