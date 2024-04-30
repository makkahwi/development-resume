import { Fragment } from "react";

import NavbarComp from "./Navbar";
import PagesHeader from "./PagesHeader";

interface props {
  children: React.ReactNode;
}

const PagesLayout = ({ children }: props) => {
  return (
    <Fragment>
      <NavbarComp />

      <div className="mx-0 mb-0 p-0 w-100 pb-5">{children}</div>
    </Fragment>
  );
};

export default PagesLayout;
