import React, { FC, useState } from "react";

export interface IButtonProps {
    activeColor: string,
}

export const Button: FC<IButtonProps> = ({ 
    children,
    activeColor,
}) => {

    const [active, setActive] = useState<boolean>(false) 


    return <button
        style={{backgroundColor: active ? activeColor : 'transparent'}}
        onClick={() => setActive(prev => !prev)}
    >{children}</button>
}