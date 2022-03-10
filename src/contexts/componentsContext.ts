import { createContext, ReactNode } from "react";

export interface IAlert {
    title?: string,
    message: string,
    onClose?: () => any,
}

export interface IComponents {
    alerts?: {
        success: (params: IAlert) => ReactNode,
        error: (params: IAlert) => ReactNode,
    },
}

export const componentsContext = createContext<IComponents>({})