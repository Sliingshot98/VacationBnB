import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";
import { Link } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button
        onClick={toggleMenu}
        style={{
          fontSize: "50px",
          padding: "10px 20px",
          borderRadius: "5px",
          backgroundColor: "lightblue",
          border: "none",
          marginLeft: "-100px",
        }}
      >
        <FaUserCircle />
      </button>
      <div className="profile-square">
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <div className="inner-profile-square">
              
              <li>{user.username}</li>
              <li>
                {user.firstName} {user.lastName}
              </li>
              <li>{user.email}</li>
              <li>
                <Link to="/spots/current">
                  <button className="manage-button">Manage Spots</button>
                </Link>
              </li>
              <li>
                <button className="logout" onClick={logout}>
                  Log Out
                </button>
              </li>
            </div>
          ) : (
            <>
              <button className="login">
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </button>
              <button className="sign-up">
               <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </button>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default ProfileButton;
