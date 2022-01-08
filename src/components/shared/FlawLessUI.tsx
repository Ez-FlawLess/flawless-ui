import React, { createContext, FC, useEffect, useState } from "react";
import { 
    AxiosInstance, 
    AxiosRequestConfig,
    AxiosResponse
} from 'axios'


export const loadingContext = createContext<any>({})

export interface IFlawLessUIProps {
    axiosInstance: AxiosInstance,
    onConfig?: (config: AxiosRequestConfig<any>) => any,
    onRequestError?: (error: any) => any,
    onResponseError?: (error: any) => any,
    onResponse?: (response: AxiosResponse<any, any>) => any,
}

export const FlawLessUI: FC<IFlawLessUIProps> = ({
    children,
    axiosInstance,
    onConfig,
    onRequestError,
    onResponseError,
    onResponse,
}) => {

    const [loadingState, setLoadingState] = useState<any>({})
    const [effectCalled, setEffectCalled] = useState<boolean>(false)

    useEffect(() => {
        if (!effectCalled) setEffectCalled(true)
        const requestInterceptor =  axiosInstance.interceptors.request.use(
            config =>  {

                const url: string = config.url as string

                setLoadingState((prev: any) => ({
                    ...prev,
                    [url.substring(0, url.indexOf('?'))]: true,
                }))

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

                const url: string = response.config.url as string

                setLoadingState((prev: any) => ({
                    ...prev,
                    [url.substring(0, url.indexOf('?'))]: false,
                }))

                if (onResponse) onResponse(response)

                return response
            },
            error => {

                const url: string = error.config.url as string

                setLoadingState((prev: any) => ({
                    ...prev,
                    [url.substring(0, url.indexOf('?'))]: false,
                }))

                if (onResponseError) onResponseError(error)

                throw error
            }
        )

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor)
            axiosInstance.interceptors.response.eject(responseInterceptor)
        }

    }, [axiosInstance])

    return (
        <loadingContext.Provider value={loadingState}>
            {effectCalled && (
                <>
                    {children}
                </>
            )}
        </loadingContext.Provider>
    )
}