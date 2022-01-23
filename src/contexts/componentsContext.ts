import { createContext, ReactNode } from "react";

export interface IComponents {
    alerts?: {
        success: ({title, message}: {title?: string, message: string}) => ReactNode,
        danger: ({title, message}: {title?: string, message: string}) => ReactNode,
    },
}

export const componentsContext = createContext<IComponents>({})