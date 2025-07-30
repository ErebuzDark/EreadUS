import React from "react";

import Header from "./header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="px-2 md:px-10 lg:px-16">{children}</div>
    </>
  );
};

export default Layout;
