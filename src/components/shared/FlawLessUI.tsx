import React, { FC, ReactNode, useEffect, useState } from "react";
import { 
    AxiosInstance, 
    AxiosRequestConfig,
    AxiosResponse
} from 'axios'

import { IStatusCodeMessages, statusCodeMessages as statusCodeMessagesDefault } from "../../utils";

import { 
    networkContext,
    componentsContext,
    configContext,
    IConfigContext,
    removeParams,
} from "../..";

export interface IComponents {
    alerts?: {
        success: (title: string, message: string) => ReactNode,
        danger: (title: string, message: string) => ReactNode,
    },
}

export interface IFlawLessUIProps {
    axiosInstance: AxiosInstance,
    onConfig?: (config: AxiosRequestConfig<any>) => any,
    onRequestError?: (error: any) => any,
    onResponseError?: (error: any) => any,
    onResponse?: (response: AxiosResponse<any, any>) => any,
    components?: IComponents,
    statusCodeMessages?: IStatusCodeMessages,
}

export const FlawLessUI: FC<IFlawLessUIProps> = ({
    children,
    axiosInstance,
    onConfig,
    onRequestError,
    onResponseError,
    onResponse,
    components,
    statusCodeMessages,
}) => {

    const [networkState, setNetworkState] = useState<any>({})
    const [componentsState, setComponentsState] = useState<IComponents>({})
    const [configState, setConfigState] = useState<IConfigContext>({
        statusCodeMessages: statusCodeMessagesDefault,
    })
    
    const [effectCalled, setEffectCalled] = useState<boolean>(false)

    useEffect(() => {
        if (!effectCalled) setEffectCalled(true)
        const requestInterceptor =  axiosInstance.interceptors.request.use(
            config =>  {

                const url: string = removeParams(config.url as string)

                setNetworkState((prev: any) => ({
                        ...prev,
                        [url]: true,
                    })
                )

                if (onConfig) onConfig(config)
                
                return config
            },
            error => {
                if (onRequestError) onRequestError(error)
                throw error
            }
        )

        const responseInterceptor = axiosInstance.interceptors.response.use(
            response => {

                const url: string = removeParams(response.config.url as string)

                setNetworkState((prev: any) => ({
                        ...prev,
                        [url]: false,
                    })
                )

                if (onResponse) onResponse(response)

                return response
            },
            error => {

                const url: string = removeParams(error.config.url as string)

                setNetworkState((prev: any) => ({
                        ...prev,
                        [url]: false,
                    })
                )

                if (onResponseError) onResponseError(error)

                throw error
            }
        )

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor)
            axiosInstance.interceptors.response.eject(responseInterceptor)
        }

    }, [axiosInstance])

    useEffect(() => {
        if (typeof components !== 'undefined') setComponentsState(components)
    }, [components])

    useEffect(() => {
        let config = {}

        if (typeof statusCodeMessages !== 'undefined') config = {...config, statusCodeMessages}

        setConfigState(prev => ({
            ...prev,
            ...config,
        }))
    }, [statusCodeMessages])


    return (
        <networkContext.Provider value={networkState}>
            <componentsContext.Provider value={componentsState}>
                <configContext.Provider value={configState}>
                    {effectCalled && (
                        <>
                            {children}
                        </>
                    )}
                </configContext.Provider>
            </componentsContext.Provider>
        </networkContext.Provider>
    )
}