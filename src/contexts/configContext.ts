import { createContext } from "react";

import { 
    IStatusCodeMessages, 
    statusCodeMessages 
} from "..";

export interface IConfigContext {
    statusCodeMessages: IStatusCodeMessages,
}

export const configContext = createContext<IConfigContext>({
    statusCodeMessages,
})