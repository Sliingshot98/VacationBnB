import { useDispatch, useSelector } from "react-redux";
import "./CreateSpot.css";
import { useEffect } from "react";
import { createSpot } from "../../store/thunks/spots";
import { useParams } from "react-router-dom";
import { useState } from "react";

function CreateSpot() {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const [streetAdress, setStreetAdress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState("");
  const [errors, setErrors] = useState({});

const submit = function(){
    if(Object.values(errors).length){
        return
    }else dispatch(createSpot())


}
  return (
    <form>
      <h1>Create a new Spot</h1>
      <p>
        Where is your place located? Please give your exact address so guests
        know where to go.
      </p>
      <div className="spot-location">
        <div className="country">
          <label>
            Country
            <input type="text" />
          </label>
        </div>
        <div className="street-address">
          <label>
            Street Address
            <input type="text" />
          </label>
        </div>
        <div className="city">
          <label>
            City
            <input type="text" />
          </label>
        </div>
        <div className="state">
          <label>
            State <input type="text" />
          </label>
        </div>
        <div className="latitude">
          <label>
            Latitude
            <input type="text" />
          </label>
        </div>
        <div className="longitude">
          <label>
            Longitude
            <input type="text" />
          </label>
        </div>
      </div>
      <div className="Description">
        <h2>Describe your place to guests</h2>
        <p>
          Mention the best features of your space, any special amenities like
          fast wifi or parking, and what you love about the neighborhood.
        </p>
        <div className="description-box">
          <label>
            Please write at least 30 characters
            <input type="text"/>
          </label>
        </div>
      </div>
      <div className="title">
        <h3>Create a title for your spot</h3>
        <p>
          Catch guests' attention with a spot title that highlights what makes
          your place special
        </p>
        <div className="title-box"><label>Name of your spot<input type="text"></input></label></div>
      </div>
      <div className="price">
        <h4>Set a base price for your spot</h4>
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results
        </p>
        <div className="Price-per-night"><label>$ Price per night (USD) <input type ="text"></input></label></div>
      </div>
      <div className="photos">
        <h5>Liven up your spot with photos</h5>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <div className="url1"> <label>Preview Image Url<input type="text"></input></label></div>
        <div className="url2"><label> Image Url<input type="text"></input></label></div>
        <div className="url3"> <label> Image Url<input type="text"></input></label></div>
        <div className="url4"> <label> Image Url<input type="text"></input></label></div>
        <div className="url5"> <label> Image Url<input type="text"></input></label></div>
      </div>
      <button onClick= {submit}>Create Spot</button>
    </form>
  );
}

export default CreateSpot;
