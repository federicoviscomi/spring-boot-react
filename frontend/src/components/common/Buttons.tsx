import React, {FC} from "react";

interface ButtonsProps {
    id?: string;
    disabled: any;
    children: any;
    className: any;
    onClickHandler: any;
    type: any;
}

const Buttons: FC<ButtonsProps> = ({id, disabled, children, className, onClickHandler, type}) => {
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

export default Buttons;
