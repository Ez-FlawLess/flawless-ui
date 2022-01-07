import React, { FC, ReactNode, useContext, useEffect, useState } from "react";

import { loadingContext } from "..";

export interface ILoadingControllerProps {
    children: (loading: boolean) => Element | Element[] | ReactNode | ReactNode[],
    url: string,
}

export const LoadingController: FC<ILoadingControllerProps> = ({
    children,
    url,
}) => {

    const loadingState = useContext(loadingContext)

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if(loadingState[url]) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [loadingState, url])

    return (
        <>
            {children(loading)}
        </>
    )
}