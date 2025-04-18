import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import icon from "/home/green529/mod_5_project/VacationBnB/frontend/dist/nobackground.png";
import { useEffect } from "react";
import { allSpots } from "../../store/thunks/spots";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  useEffect(
    function () {
      dispatch(allSpots());
    },
    [dispatch]
  );
  return (
    <ul
      style={{
        display: "flex",
        width: "100vw",
        justifyContent: "space-between",
        alignItems: "center",
        listStyle: "none",
        padding: "10px 20px"
      }}
    >
      <li style={{ display: "flex", alignItems: "center" }}>
        <NavLink className="home" to="/">
          <img
            src={icon}
            alt="Home"
            style={{ width: "100px", height: "100px" }}
          />
        </NavLink>
        </li>
        <div className="create-a-spot">
          {sessionUser && (
            <NavLink className="spotFormLink" to="/spots/new">
              Create A New Spot
            </NavLink>
          )}
        </div>
      
      {isLoaded && (
        <li className="profileButtonInNavigation">
          <ProfileButton className="profileButton" user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
