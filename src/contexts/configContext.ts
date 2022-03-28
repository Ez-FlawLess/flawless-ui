import { createContext } from "react";

import { 
    IStatusCodeMessages, 
    statusCodeMessages, 
} from "../utils";

export type HttpMethod = 'get' | 'head' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace' | 'patch'

export interface IConfigContext {
    statusCodeMessages: IStatusCodeMessages,
    feedbackMethods: HttpMethod[],
}

export const configContextDefault: IConfigContext = {
    statusCodeMessages,
    feedbackMethods: ['post', 'patch', 'put', 'delete'],
}

export const configContext = createContext<IConfigContext>(configContextDefault)