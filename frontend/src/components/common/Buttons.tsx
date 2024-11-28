import React, {FC} from "react";

interface ButtonsProps {
    disabled: any;
    children: any;
    className: any;
    onClickHandler: any;
    type: any;
}

const Buttons: FC<ButtonsProps> = ({disabled, children, className, onClickHandler, type}) => {
    return (
        <button
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
