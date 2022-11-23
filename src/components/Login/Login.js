import React, { useEffect, useState, useReducer, useContext, useRef } from 'react';
import AuthContext from '../../store/auth-context';

import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

import classes from './Login.module.css';


// Reducer function that automatially runs when the dispatch function is called.
const emailReducer = (prevState, action) => {
  if(action.type === 'INPUT_EMAIL') {
    return { value: action.payload, isValid: action.payload.includes('@') }
  }

  if(action.type === 'INPUT_BLUR') {
    return { ...prevState, isValid: prevState.value.includes('@') }
  }

  // returns default state
  return { value: '', isValid: false};
};

// Password State Reducer
const passwordReducer = (prevState, action) => {

  if(action.type === 'INPUT_PASSWORD') {
    return { value: action.payload, isValid: (action.payload.trim().length > 6) }
  }

  if(action.type === 'INPUT_BLUR') {
    return { ...prevState, isValid: (prevState.value.trim().length > 6) }
  }

  return { value: '', isValid: false };
};

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // You have the state, dispatch function, and usReducer to set up reducer function to be run on dispatch.
  // and the intial state of emailState
  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null });

  // utilized alias assigment in object destructuring to pull isValid data from state.
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  // getting login state from AuthContext store
  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  /* Whenever you have an action that is to be executed in response to another
    action, that is considered a side effect. We use debouncing and use effect cleanup function
    to optimize validating the user's email and password.
  */

  // We switched to using useEffect for checking the form validity because we are guaranteed to get
  // the latest state snapshots. This would be the optimal way of handling the Form valid state.
  // we also check if the input was already valid so the effect doesn't constantly run when the user adds more
  // characters after the input was already valid.
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      console.log('checking validity');
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500); 

    // For the first time the component is run, the below cleanup function doesn't run,
    // however everytime after, it does run.
    return () => {
      console.log('ClEANUP');
      clearTimeout(timeOutId);
    }
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({ type: 'INPUT_EMAIL', payload: event.target.value });

    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPassword({ type: 'INPUT_PASSWORD', payload: event.target.value })

    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid
    // );
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.isValid.includes('@'));
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };
  

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          ref={emailInputRef}
          id='email'
          label='E-mail'
          type='email'
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input 
          ref={passwordInputRef}
          id='password'
          label='Password'
          type='password'
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
