import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Header.css";
import signInWithGoogle from "../firebase";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Header() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  // console.log(user);

  function signOutOfGoogle() {
    auth.signOut();
    navigate("/");
  }

  return (
    <div id="header">
      <div id="headerLeft">
        <Link to="/" className="navMenu">
          <p>QUICKCHAT</p>
        </Link>
      </div>

      <div id="headerRight">
        {user ? (
          <Link to="/chat" className="navMenu">
            <p>Chat</p>
          </Link>
        ) : (
          <></>
        )}

        <p
          className="navMenu"
          onClick={user ? signOutOfGoogle : signInWithGoogle}
        >
          {user ? "Sign Out" : "Sign In"}
        </p>
      </div>
    </div>
  );
}

export default Header;
