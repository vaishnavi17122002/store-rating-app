import React from "react";

import "../styles/navbar.css";

function Navbar({ title }) {

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {

    localStorage.clear();

    window.location.href = "/";

  };

  return (

    <nav className="navbar">

      {/* Left */}

      <div className="navbar-left">

        <h2>
          ⭐ {title}
        </h2>

      </div>

      {/* Right */}

      <div className="navbar-right">

        <span className="user-name">

          👋 Welcome,

          {" "}

          {user?.name}

        </span>

        <button
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>

  );
}

export default Navbar;