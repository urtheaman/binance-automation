import React, { Fragment } from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";

const CustomLink = ({ children, to, ...props }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Fragment>
      <Link
        to={to}
        {...props}
        style={{ textDecoration: match ? "none" : "underline" }}
      >
        {children}
      </Link>
    </Fragment>
  );
};

export default CustomLink;
