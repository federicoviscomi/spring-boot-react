import React, {FC} from "react";

interface ButtonProps {
    id?: string;
    disabled?: boolean;
    children: any;
    className: any;
    onClickHandler?: any;
    type?: "submit" | "reset" | "button" | undefined;
}

const Button: FC<ButtonProps> = (
    {
        id,
        disabled = false,
        children,
        className,
        onClickHandler = undefined,
        type = 'button'
    }
) => {
    return (
        <button
            id={id}
            disabled={disabled}
            type={type}
            className={`${className}`}
            onClick={onClickHandler}
        >
            {children}
        </button>
    );
};

export default Button;
