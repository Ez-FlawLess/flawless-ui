import React, { FC, useContext, useEffect, useState } from "react";

import {
    networkContext,
    componentsContext, 
    configContext,
} from '../..'

export interface IHttpFeedback {
    url: string,
    onSuccess?: (data: any) => any,
    onError?: (data: any) => any,
    showSuccess?: boolean,
    showError?: boolean,
    message?: string,
    title?: string,
}

export const HttpFeedback: FC<IHttpFeedback> = ({
    url,
    onSuccess,
    onError,
    showError,
    showSuccess,
    message,
    title,
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

            const handleRequest = () => {
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
            }

            if (networkObject.success === true) {
                if (onSuccess) onSuccess(networkObject.data)
                if (statusCodeMessages.success?.message) {
                    setResponse({
                        success: true,
                        title: statusCodeMessages.success?.title,
                        message: statusCodeMessages.success?.message,
                    })
                } else {
                    handleRequest()
                }
            } else {
                if (onError) onError(networkObject.data)
                if (statusCodeMessages.error?.message) {
                    const message = statusCodeMessages.error?.message(networkObject.data)
                    if (message) {
                        setResponse({
                            success: true,
                            title: statusCodeMessages.error?.title,
                            message: message,
                        })
                    } else {
                        handleRequest()
                    }
                } else {
                    handleRequest()
                }
            }

            // switch (networkObject.success) {
            //     case true:
            //         if (onSuccess) onSuccess(networkObject.data)
            //         if (statusCodeMessages.success?.message) {
            //             setResponse({
            //                 success: true,
            //                 title: statusCodeMessages.success?.title,
            //                 message: statusCodeMessages.success?.message,
            //             })
            //             break;
            //         }
            //     case false:
            //         if (onError) onError(networkObject.data)
            //         if (statusCodeMessages.error?.message) {
            //             const message = statusCodeMessages.error?.message(networkObject.data)
            //             if (message) {
            //                 setResponse({
            //                     success: true,
            //                     title: statusCodeMessages.error?.title,
            //                     message: message,
            //                 })
            //                 break
            //             }
            //         }
            //     default:
            //         if (typeof statusCodeMessages[statusCodeFirstDigit].message === 'string') {
            //             setResponse({
            //                 success: networkObject.success,
            //                 title: statusCodeMessages[statusCodeFirstDigit].title,
            //                 message: statusCodeMessages[statusCodeFirstDigit].message,
            //             })
            //         } else if (typeof statusCodeMessages[statusCodeFirstDigit].message[networkObject.statusCode] === 'string') {
            //             setResponse({
            //                 success: networkObject.success,
            //                 title: statusCodeMessages[statusCodeFirstDigit].title,
            //                 message: statusCodeMessages[statusCodeFirstDigit].message[networkObject.statusCode],
            //             })
            //         } else {
            //             setResponse({
            //                 success: networkObject.success,
            //                 title: statusCodeMessages[statusCodeFirstDigit].message[networkObject.statusCode].message.title,
            //                 message: statusCodeMessages[statusCodeFirstDigit].message[networkObject.statusCode].message,
            //             })
            //         }
            //         break;
            // }
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

    if (showSuccess && response?.success === true) return (
        <>
            {componentsState.alerts?.success({title: title || response.title, message: message || response.message, onClose: handleOnClose})}
        </>
    )

    if (showError && response?.success === false) return (
        <>
            {componentsState.alerts?.error({title: title || response.title, message: message || response.message, onClose: handleOnClose})}
        </>
    )

    return null
}

HttpFeedback.defaultProps = {
    showSuccess: true,
    showError: true,
}