import React, { FC, ReactNode, useContext, useEffect, useState } from "react";

import { networkContext } from "../..";

export interface ILoadingControllerProps {
    children: (loading: boolean) => Element | Element[] | ReactNode | ReactNode[],
    url: string,
}

export const LoadingController: FC<ILoadingControllerProps> = ({
    children,
    url,
}) => {

    const {network} = useContext(networkContext)

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if(network[url] === true) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [network, url])

    return (
        <>
            {children(loading)}
        </>
    )
}