import { createContext, ReactNode, useContext } from "react";

export interface IAlert {
    title?: string,
    message: string,
    onClose?: () => any,
}

export interface ITextInputProps {
    value: string,
    label?: string,
    error: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any,
    onFocus: (e: React.FocusEvent<HTMLInputElement, Element>) => any,
    onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => any,
}

export interface IComponents {
    alerts?: {
        success: (params: IAlert) => ReactNode,
        error: (params: IAlert) => ReactNode,
    },
    inputs?: {
        textInput: (params: ITextInputProps, customProps?: any) => ReactNode,
    }
}

export const componentsContext = createContext<IComponents>({})

export const useComponentsContext = () => useContext(componentsContext)