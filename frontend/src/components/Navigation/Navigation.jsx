// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import icon from "/home/green529/vacationBnB/VacationBnB/frontend/dist/vacation.jpg"
import { useEffect } from 'react';
import { allSpots } from '../../store/thunks/spots';



function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  useEffect(function(){
    dispatch(allSpots())
  }, [dispatch])
  return (
    <ul style = {{display: "flex", width: "100vw", justifyContent:"space-between", listStyle:"none"}}>
      <li>
        <NavLink className= "home" to="/">
        <img src={icon} alt="Home" style={{ width: '100px', height: '100px' }} />
        </NavLink>
        {sessionUser && <NavLink className= "spotFormLink" to="/spots/new">
        Create A New Spot
        </NavLink>}
      </li>
      {isLoaded && (
        <li className="profileButtonInNavigation">
          <ProfileButton className="profileButton" user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;