import "./UpdateButton.css";
import { Link } from "react-router-dom";

function UpdateButton({id}){
     
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