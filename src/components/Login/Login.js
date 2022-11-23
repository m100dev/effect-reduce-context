import React, { useEffect, useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


console.log('OUTSIDE OF THE FUNCTIONAL COMPONENT');

// Reducer function that automatially runs when the dispatch function is called.
const emailReducer = (prevState, action) => {
  if(action.type === 'INPUT_EMAIL') {
    console.log('INPUT_EMAIL dispatch has run');
    console.log(action.payload);
    return { value: action.payload, isValid: action.payload.includes('@')}
  }

  if(action.type === 'INPUT_BLUR') {
    return {...prevState, isValid: prevState.value.includes('@')}
  }

  // returns updated state
  return { value: '', isValid: false};
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // You have the state, dispatch function, and usReducer to set up reducer function to be run on dispatch.
  // and the intial state of emailState
  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null});

  /* Whenever you have an action that is to be executed in response to another
    action, that is considered a side effect. We use debouncing and use effect cleanup function
    to optimize validating the user's email and password.
  */
  /*useEffect(() => {
    const timeOutId = setTimeout(() => {
      console.log('checking validity');
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 500); 

    // For the first time the component is run, the below cleanup function doesn't run,
    // however everytime after, it does run.
    return () => {
      console.log('ClEANUP');
      clearTimeout(timeOutId);
    }
  }, [enteredEmail, enteredPassword]); */

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({type: 'INPUT_EMAIL', payload: event.target.value});

    setFormIsValid(
      emailState.isValid && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.isValid.includes('@'));
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
