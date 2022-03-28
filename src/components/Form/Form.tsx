import React, { useState } from "react";
import { FC } from "react";
import { formContext } from '../../contexts'

// const createValues = <T extends {[kay: string]: any}>(values: T) => values

export type ValidateOn = 'touch' | 'blur' | 'dirty' | 'submit'

export const Form: FC<{
    validateOn?: ValidateOn,
    onSubmit: (values: Record<string, any>) => any,
}> = ({
    children,
    validateOn = 'blur',
    onSubmit,
}) => {

    const [values, setValues] = useState<Record<string, any>>({})
    const [touched, setTouched] = useState<any>({})
    const [dirty, setDirty] = useState<any>({})
    const [blurred, setBlurred] = useState<any>({})
    const [errors, setErrors] = useState<any>({})
    const [submitted, setSubmitted] = useState<boolean>(false)

    const handleOnInitialValue = (name: string, value: string | number | boolean) => {
        setValues((prev: any) => ({...prev, [name]: value}))
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setValues((prev: any) => ({...prev, [name]: e.target.value}))
        if (!dirty[name]) setDirty((prev: any) => ({...prev, [name]: true}))
    }

    const handleOnFocus = (_e: React.FocusEvent<HTMLInputElement, Element>, name: string) => {
        if (!touched[name]) setTouched((prev: any) => ({...prev, [name]: true}))
    }

    const handleOnBlur = (_e: React.FocusEvent<HTMLInputElement, Element>, name: string) => {
        if (!blurred[name]) setBlurred((prev: any) => ({...prev, [name]: true}))
    }

    const handleOnError = (name: string, errors?: string[]) => {
        setErrors((prev: any) => ({...prev, [name]: errors}))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!submitted) setSubmitted(true)

        const hasError = Object.keys(errors).length
        if (hasError) return null

        onSubmit(values)
        // const submittedValues = createValues(values)
    }

    return (
        <formContext.Provider
            value={{
                values,
                touched,
                dirty,
                blurred,
                errors,
                submitted,
                events: {
                    onChange: handleOnChange,
                    onFocus: handleOnFocus,
                    onBlur: handleOnBlur,
                    onInitialValue: handleOnInitialValue,
                    onError: handleOnError,
                },
                options: {
                    validateOn,
                }
            }}
        >
            <form
                onSubmit={handleSubmit}
            >
                {children}
            </form>
        </formContext.Provider>
    )
}

Form.defaultProps = {
    validateOn: 'blur'
}