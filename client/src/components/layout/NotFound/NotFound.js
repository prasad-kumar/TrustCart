import React from "react";
import "./NotFound.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import notFound from '../../../images/notFound.svg';

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <img src={notFound} alt="page not found"/>
      <br/>
      <Typography>Page Not Found </Typography>
      <Link to="/"> &larr; &nbsp; Home</Link>
    </div>
  );
};

export default NotFound;
