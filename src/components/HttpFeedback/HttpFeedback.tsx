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
        console.log(1, url,network[url]?.success, typeof network[url]?.success)
        if (url && typeof network[url]?.success === 'boolean') {
            console.log(2)
            const { statusCodeMessages }: any = configState
            const networkObject: {
                success: boolean,
                statusCode: number,
                data: any,
            } = network[url]
            const statusCodeFirstDigit: 1 | 2 | 3 | 4 | 5 = parseInt(networkObject.statusCode.toString()[0]) as 1 | 2 | 3 | 4 | 5

            switch (networkObject.success) {
                case true:
                    console.log(3)
                    if (statusCodeMessages.success?.message) {
                        console.log(4)
                        setResponse({
                            success: true,
                            title: statusCodeMessages.success?.title,
                            message: statusCodeMessages.success?.message,
                        })
                        break;
                    }
                case false:
                    console.log(5)
                    if (statusCodeMessages.error?.message) {
                        console.log(6)
                        const message = statusCodeMessages.error?.message(networkObject.data)
                        if (message) {
                            console.log(7)
                            setResponse({
                                success: true,
                                title: statusCodeMessages.error?.title,
                                message: message,
                            })
                            break
                        }
                    }
                default:
                    console.log(8)
                    if (typeof statusCodeMessages[statusCodeFirstDigit].message === 'string') {
                        console.log(9)
                        setResponse({
                            success: networkObject.success,
                            title: statusCodeMessages[statusCodeFirstDigit].title,
                            message: statusCodeMessages[statusCodeFirstDigit].message,
                        })
                    } else if (typeof statusCodeMessages[statusCodeFirstDigit].message[networkObject.statusCode] === 'string') {
                        console.log(10)
                        setResponse({
                            success: networkObject.success,
                            title: statusCodeMessages[statusCodeFirstDigit].title,
                            message: statusCodeMessages[statusCodeFirstDigit].message[networkObject.statusCode],
                        })
                    } else {
                        console.log(11)
                        setResponse({
                            success: networkObject.success,
                            title: statusCodeMessages[statusCodeFirstDigit].message[networkObject.statusCode].message.title,
                            message: statusCodeMessages[statusCodeFirstDigit].message[networkObject.statusCode].message,
                        })
                    }
                    console.log(12)
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


    console.log('feedback', response)

    if (response?.success === true) return (
        <>
            {componentsState.alerts?.success({title: response.title, message: response.message, onClose: handleOnClose})}
        </>
    )

    if (response?.success === false) return (
        <>
            {componentsState.alerts?.danger({title: response.title, message: response.message, onClose: handleOnClose})}
        </>
    )

    return null
}