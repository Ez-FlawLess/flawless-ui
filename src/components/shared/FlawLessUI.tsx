import React, { FC, useEffect, useState } from "react";
import { 
    AxiosInstance, 
    AxiosRequestConfig,
    AxiosResponse
} from 'axios'

import { 
    networkContext,
    componentsContext,
    configContext,
    IConfigContext,
    removeParams,
    configContextDefault,
    IStatusCodeMessages,
    HttpMethod,
    IComponents,
} from "../..";

export interface IFlawLessUIProps {
    axiosInstance: AxiosInstance,
    onConfig?: (config: AxiosRequestConfig<any>) => any,
    onRequestError?: (error: any) => any,
    onResponseError?: (error: any) => any,
    onResponse?: (response: AxiosResponse<any, any>) => any,
    components?: IComponents,
    statusCodeMessages?: IStatusCodeMessages,
    feedbackMethods?: string[],
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
    feedbackMethods,
}) => {

    const [networkState, setNetworkState] = useState<any>({})
    const [componentsState, setComponentsState] = useState<IComponents>({})
    const [configState, setConfigState] = useState<IConfigContext>(configContextDefault)
    
    const [effectCalled, setEffectCalled] = useState<boolean>(false)
    const [callEffect, setCallEffect] = useState<boolean>(false)

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
                        [url]: configState.feedbackMethods.includes(response.config.method as HttpMethod) 
                            ? {
                                success: true,
                                statusCode: response.status,
                                data: response.data,
                            }
                            : false,
                    })
                )

                if (onResponse) onResponse(response)

                return response
            },
            error => {

                const url: string = removeParams(error.config.url as string)

                setNetworkState((prev: any) => ({
                        ...prev,
                        [url]: configState.feedbackMethods.includes(error.config.method as HttpMethod) 
                            ? {
                                success: false,
                                statusCode: error.response.status,
                                data: error.response.data,
                            }
                            : false,
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

    }, [axiosInstance, callEffect])

    useEffect(() => {
        if (typeof components !== 'undefined') setComponentsState(components)
    }, [components])

    useEffect(() => {
        let config = {}

        if (typeof statusCodeMessages !== 'undefined') config = {...config, statusCodeMessages}

        if (typeof feedbackMethods !== 'undefined') config = {...config, feedbackMethods}

        setConfigState(prev => ({
            ...prev,
            ...config,
        }))
        setEffectCalled(false)
        setCallEffect(prev => !prev)
    }, [
        statusCodeMessages, 
        feedbackMethods,
    ])

    console.log('config', configState)


    return (
        <networkContext.Provider value={{network: networkState, setNetwork: p => setNetworkState(p)}}>
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