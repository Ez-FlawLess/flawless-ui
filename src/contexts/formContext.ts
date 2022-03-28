import React, { createContext, useContext } from "react";
import { ValidateOn } from "../components";

export interface IFormContext {
    values: any,
    touched: any,
    dirty: any,
    blurred: any,
    errors: any,
    submitted: boolean,
    events: {
        onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => any,
        onFocus: (e: React.FocusEvent<HTMLInputElement, Element>, name: string) => any,
        onBlur: (e: React.FocusEvent<HTMLInputElement, Element>, name: string) => any,
        onInitialValue: (name: string, value: string | number | boolean) => any,
        onError: (name: string, error?: string[]) => any,
    },
    options: {
        validateOn: ValidateOn,
    }
}

export const formContext = createContext<IFormContext | null>(null)

export const useFormContext = () => useContext(formContext) as IFormContext