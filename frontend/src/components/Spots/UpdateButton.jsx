import { useDispatch } from "react-redux";
import "./UpdateButton.css";
import { updateSpot } from "../../store/thunks/spots";
import { Link } from "react-router-dom";

function UpdateButton({id}){
    const dispatch = useDispatch();
     
return (
    <Link to ={`/spots/${id}/edit`} onClick={function(event){
        event.stopPropagation()
    }}>
    <button className="updateButton">
        Update Spot
    </button>
    </Link>
)
}
export default UpdateButton;