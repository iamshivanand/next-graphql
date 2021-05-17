import React from "react";
import Link from "next/link";
import navStyles from "../styles/Nav.module.css";
import { useState } from "react";
function Nav({handleOnsubmit}) {
  const [search, setSearch] = useState("");
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
