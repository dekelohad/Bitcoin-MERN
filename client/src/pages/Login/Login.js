import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { loginUser, selectUser } from '../../features/user/userSlice';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
const Login = () => {
  const [userExists, setUserExists] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });
  const { isFetching } = useSelector(selectUser);

  const onSubmit = async (data) => {
    const res = await dispatch(loginUser(data));
    if (res.payload) {
      history.push('/dashboard');
    } else {
      setUserExists(true);
    }
  };

  return (
    <>
      <Helmet bodyAttributes={{ style: 'background-color : black' }} />
      <div className="login container">
        <h1>
          <span role="img" aria-label="waving hand">
            👋
          </span>
          Welcome Back!
        </h1>
        <div className="login__form">
          <h2> Login Form </h2>
          <form onSubmit={handleSubmit(onSubmit)} method="POST">
            <div className="username">
              <div>
                <label htmlFor="username">Username</label>
              </div>
              <input
                name="username"
                type="username"
                id="username"
                {...register('username', {
                  required: 'You must specify an username',
                  minLength: {
                    value: 5,
                    message: 'username should have least 5 characters',
                  },
                })}
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>

            <div className="password">
              <div>
                <label htmlFor="password">Password</label>
              </div>
              <input
                name="password"
                type="password"
                id="password"
                {...register('password', {
                  required: 'You must specify a password',
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="btn"
                disabled={!formState.isValid}
              >
                Sign in
              </button>
              {userExists ? <p>Username doesn't exist</p> : null}
              <p className="login__redirect">
                Don't have an account?
                <span
                  onClick={() => {
                    history.push('/');
                  }}
                >
                  Sign Up
                </span>
              </p>
              {isFetching ? (
                <Loader
                  type="Puff"
                  color="#00BFFF"
                  height={60}
                  width={60}
                  timeout={3000}
                />
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
