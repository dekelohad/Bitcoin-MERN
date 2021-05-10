import React from 'react';
import './Error.scss';
import { Link } from 'react-router-dom';
const Error = () => {
  return (
    <div className="error__page container">
      <h1>404 not found</h1>
      <Link className="btn btn-warning" role="button" to="/">
        Go Back To Register Page
      </Link>
    </div>
  );
};

export default Error;
