import React, { createContext, FC, useEffect, useState } from "react";
import { AxiosInstance } from 'axios'


export const loadingContext = createContext<any>({})

export interface IFlawLessUIProps {
    axiosInstance: AxiosInstance,
}

export const FlawLessUI: FC<IFlawLessUIProps> = ({
    children,
    axiosInstance,
}) => {

    const [loadingState, setLoadingState] = useState<any>({})

    useEffect(() => {
        console.log('running good', axiosInstance)
        const requestInterceptor =  axiosInstance.interceptors.request.use(
            config =>  {
                console.log('c', config)

                const url: string = config.url as string

                setLoadingState((prev: any) => ({
                    ...prev,
                    [url.substring(0, url.indexOf('?'))]: true,
                }))
                
                return config
            },
            error => {
                console.log('e', error)
                throw error
            }
        )

        const responseInterceptor = axiosInstance.interceptors.response.use(
            response => {
                console.log('r', response)

                const url: string = response.config.url as string

                setLoadingState((prev: any) => ({
                    ...prev,
                    [url.substring(0, url.indexOf('?'))]: false,
                }))

                return response
            },
            error => {
                console.log('e', error)

                const url: string = error.config.url as string

                setLoadingState((prev: any) => ({
                    ...prev,
                    [url.substring(0, url.indexOf('?'))]: false,
                }))

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
            {children}
        </loadingContext.Provider>
    )
}