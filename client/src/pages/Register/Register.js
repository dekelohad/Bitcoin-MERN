import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, selectUser } from '../../features/user/userSlice';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userExists, setUserExists] = useState(false);

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const { isFetching } = useSelector(selectUser);
  const onSubmit = async (userData) => {
    const res = await dispatch(registerUser(userData));
    if (res.payload) {
      history.push('/login');
    } else {
      setUserExists(true);
    }
  };

  const validatePassword = (value) => {
    if (value.length < 8) {
      return 'Password should be at-least 8 characters.';
    } else if (!/(?=.*\d)(?=.*[A-Z])(?!.*\s)/.test(value)) {
      return 'Password should contain at least one uppercase letter and a digit.';
    }
    return true;
  };

  return (
    <>
      <Helmet bodyAttributes={{ style: 'background-color : black' }} />
      <div className="register container">
        <h1>Register Form</h1>
        <div className="register__form">
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
                  validate: validatePassword,
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
                Submit
              </button>
              {userExists ? <p>Username already exists</p> : null}
              <p className="register__redirect">
                Already have an account?
                <span
                  onClick={() => {
                    history.push('/login');
                  }}
                >
                  Sign in
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

export default Register;
