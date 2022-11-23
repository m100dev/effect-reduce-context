import React, { useRef, useImperativeHandle } from 'react';

import classes from './Input.module.css';

              // Wrapped the Input component function with React.forwardRef() so the ref argument can be 
              // passed to useImperativeHandle
const Input = React.forwardRef((props, ref) => {

    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
    };

    // Using the useImperativeHandle hook to expose the activate function outside of the Input component
    useImperativeHandle(ref, () => {
        return {
            focus: activate
        };
    });

    return (
        <div
            className={`${classes.control} ${
                props.isValid === false ? classes.invalid : ''
            }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            <input
                ref={inputRef}
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    );
});

export default Input;