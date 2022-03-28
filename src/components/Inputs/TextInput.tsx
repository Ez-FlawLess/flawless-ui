import React, { useEffect } from "react";
import { FC } from "react";
import { useComponentsContext, useFormContext } from "../../contexts";

export interface TextInputValidators {
    required?: string,
    minLength?: {value: number, message: string},
    maxLength?: {value: number, message: string},
    validate?: (value: any) => string | void,
}

export const TextInput: FC<{
    name: string,
    initialValue?: string,
    label?: string,
    [key: string]: any,
} & TextInputValidators> = ({
    name, 
    initialValue = '',
    required,
    minLength,
    maxLength,
    validate,
    label,
    ...customProps
}) => {

    const form = useFormContext()
    const componnets = useComponentsContext()

    useEffect(() => {
        form.events.onInitialValue(name, initialValue)
    }, [name, initialValue])

    useEffect(() => {
        const errors: string[] = []
        const currentValue = form.values[name]

        const checkForErrors = () => {

            if (required && !currentValue) return errors.push(required)

            if (validate) {
                const validateError = validate(currentValue)
                if (validateError) return errors.push(validateError)
            }

            if (minLength && minLength.value > currentValue.length) return errors.push(minLength.message)

            if (maxLength && maxLength.value < currentValue.length) return errors.push(maxLength.message)

        }
        checkForErrors()

        console.log(errors)

        form.events.onError(name, errors)
    }, [
        form.values[name],
        required,
    ])

    const getError = (): string => {
        if (form.errors[name]) {
            const error: string = form.errors[name][0] ? form.errors[name][0] as string : ''
            if (form.submitted) return error
            switch (form.options.validateOn) {
                case 'touch':
                    if (form.touched[name]) return error
                    break
                case 'blur':
                    if (form.blurred[name]) return error
                    break
                case 'dirty':
                    if (form.dirty[name]) return error
                    break
                default:
                    return ''
            }
            return ''
        } else {
            return ''
        }
    }

    if (componnets.inputs?.textInput) return (
        <>
            {componnets.inputs.textInput({
                label,
                value: form.values[name],
                onChange: e => form.events.onChange(e, name),
                onFocus: e => form.events.onFocus(e, name),
                onBlur: e => form.events.onBlur(e, name),
                error: getError(),
            }, customProps)}
        </>
    )
    return (
        <div>
            No TextInput componnet has been passed to the componnet prop in FlawLessUI
        </div>
    )
}

TextInput.defaultProps = {
    initialValue: '',
}