import React, { FC, useContext, useEffect, useState } from "react";

import {
    networkContext,
    componentsContext, 
    configContext,
} from '../..'

export const HttpFeedback: FC<{
    url: string,
}> = ({
    url,
}) => {

    const {network, setNetwork} = useContext(networkContext)
    const componentsState = useContext(componentsContext)
    const configState = useContext(configContext)

    const [response, setResponse] = useState<{
        success: boolean,
        title?: string,
        message: string,
    } | null>(null)

    useEffect(() => {
        if (url && typeof network[url]?.success === 'boolean') {
            const { statusCodeMessages }: any = configState
            const networkObject: {
                success: boolean,
                statusCode: number,
                data: any,
            } = network[url]
            const statusCodeFirstDigit: 1 | 2 | 3 | 4 | 5 = parseInt(networkObject.statusCode.toString()[0]) as 1 | 2 | 3 | 4 | 5

            switch (networkObject.success) {
                case true:
                    if (statusCodeMessages.success?.message) {
                        setResponse({
                            success: true,
                            title: statusCodeMessages.success?.title,
                            message: statusCodeMessages.success?.message,
                        })
                        break;
                    }
                case false:
                    if (statusCodeMessages.error?.message) {
                        const message = statusCodeMessages.error?.message(networkObject.data)
                        if (message) {
                            setResponse({
                                success: true,
                                title: statusCodeMessages.error?.title,
                                message: message,
                            })
                            break
                        }
                    }
                default:
                    if (typeof statusCodeMessages[statusCodeFirstDigit].message === 'string') {
                        setResponse({
                            success: networkObject.success,
                            title: statusCodeMessages[statusCodeFirstDigit].title,
                            message: statusCodeMessages[statusCodeFirstDigit].message,
                        })
                    } else if (typeof statusCodeMessages[statusCodeFirstDigit].message[networkObject.statusCode] === 'string') {
                        setResponse({
                            success: networkObject.success,
                            title: statusCodeMessages[statusCodeFirstDigit].title,
                            message: statusCodeMessages[statusCodeFirstDigit].message[networkObject.statusCode],
                        })
                    } else {
                        setResponse({
                            success: networkObject.success,
                            title: statusCodeMessages[statusCodeFirstDigit].message[networkObject.statusCode].message.title,
                            message: statusCodeMessages[statusCodeFirstDigit].message[networkObject.statusCode].message,
                        })
                    }
                    break;
            }
        } else {
            setResponse(null)
        }
    }, [
        url,
        network,
        componentsState,
        configState,
    ])

    const handleOnClose = (): any => {
        setNetwork((prev: any) => ({
            ...prev,
            [url]: false,
        }))
    }

    if (response?.success === true) return (
        <>
            {componentsState.alerts?.success({title: response.title, message: response.message, onClose: handleOnClose})}
        </>
    )

    if (response?.success === false) return (
        <>
            {componentsState.alerts?.error({title: response.title, message: response.message, onClose: handleOnClose})}
        </>
    )

    return null
}