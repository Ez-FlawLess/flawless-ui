import React, { FC, ReactNode, useContext, useEffect, useState } from "react";

import { networkContext } from "../..";

export interface ILoadingControllerProps {
    children: (loading: boolean) => Element | Element[] | ReactNode | ReactNode[],
}

export const LoadingController: FC<ILoadingControllerProps & (
    {url: string, all?: undefined} | {url?: undefined, all: true}
)> = ({
    children,
    url,
    all,
}) => {

    const {network, numberOfPendingRequests} = useContext(networkContext)

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (url) {
            if(network[url] === true) {
                setLoading(true)
            } else {
                setLoading(false)
            }
        }
    }, [network, url])

    useEffect(() => {
        if (all) {
            if (numberOfPendingRequests) setLoading(true)
            else setLoading(false)
        }
    }, [url, numberOfPendingRequests])

    return (
        <>
            {children(loading)}
        </>
    )
}