import { useDispatch, useSelector } from "react-redux";
import "./CreateSpot.css";
import { useEffect  } from "react";
import { createSpot, spotDetails, updateSpot } from "../../store/thunks/spots";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";


function SpotForm({isEdit}) {
  const sessionUser = useSelector(state => state.session.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector(state => state.spotsReducer.details);
  const [country, setCountry] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [previewImage, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(function(){
    if(isEdit && !spot ){
    dispatch(spotDetails(id))
    
     }
  });
  useEffect(function(){
    if(isEdit && spot){
      setCountry(spot.country),
      setStreetAddress(spot.address)
      setCity(spot.city),
      setState(spot.state),
      setLatitude(spot.lat),
      setLongitude(spot.lng),
      setDescription(spot.description),
      setTitle(spot.name),
      setPrice(spot.price),
      setImage1(spot.previewImage),
      setImage2(spot.image2 ? spot.image2 : ""),
      setImage3(spot.image3 ? spot.image3 : ""),
      setImage4(spot.image4 ? spot.image4 : ""),
      setImage5(spot.image5 ? spot.image5 : "")
    }
  },[isEdit, spot]);

  
  const handleErrors = function () {
    const errors = {};
    if (!country) {
      errors.country = "Country is required";
    }
    if (!streetAddress) {
      errors.streetAddress = "Address is required";
    }
    if (!city) {
      errors.city = "City is required";
    }
    if (!state) {
      errors.state = "State is required";
    }
    if (!latitude) {
      errors.latitude = "Latitude is required";
    }
    if (!longitude) {
      errors.longitude = "Longitude is required";
    }
    if (description.length < 30) {
      errors.description = "Description needs a minimum of 30 characters";
    }
    if (!title) {
      errors.title = "Name is required";
    }
    if (!price) {
      errors.price = "Price is required";
    }
    if (!previewImage) {
      errors.previewImage = "Preview image is required";
    }
    if (
      image2.length > 0 &&
      !image2.endsWith(".png") &&
      !image2.endsWith(".jpg") &&
      !image2.endsWith(".jpeg")
    ) {
      errors.image2 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (
      image3.length > 0 &&
      !image3.endsWith(".png") &&
      !image3.endsWith(".jpg") &&
      !image3.endsWith(".jpeg")
    ) {
      errors.image3 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (
      image4.length > 0 &&
      !image4.endsWith(".png") &&
      !image4.endsWith(".jpg") &&
      !image4.endsWith(".jpeg")
    ) {
      errors.image4 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (
      image5.length > 0 &&
      !image5.endsWith(".png") &&
      !image5.endsWith(".jpg") &&
      !image5.endsWith(".jpeg")
    ) {
      errors.image5 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    setErrors(errors)
    return
  };

  const submit = async function (event) {
    event.preventDefault()
    handleErrors()
    if (Object.values(errors).length) {
      return;
    } else {
      const payload = {
        ownerId: sessionUser.id,
        address: streetAddress,
        city,
        state,
        country,
        lat: latitude,
        lng: longitude,
        name: title,
        description,
        price,
        previewImage
      }
      if(!isEdit){
      const varName = await dispatch(createSpot(payload))
      setErrors({})
      navigate(`/spots/${varName.id}`)
      }
      else {
        payload.id=id;
        const varName = await dispatch(updateSpot(payload))
        navigate(`/spots/${varName.id}`)
      }
    }
    
  };
  return (
    <form>
      <h1>{isEdit ? "Update your Spot" : "Create a new Spot" }</h1>
      <p>
        Where is your place located? Please give your exact address so guests
        know where to go.
      </p>
      <div className="spot-location">
        <div className="country">
          <label>
            Country {errors.country && <p className="errors">{errors.country}</p>}
            <input
              type="text"
              value={country}
              onChange={(event) => {
                setCountry(event.target.value);
              }}
            />
          </label>
        </div>
        <div className="street-address">
          <label>
            Street Address {errors.streetAddress && <p className="errors">{errors.streetAddress}</p>}
            <input
              type="text"
              value={streetAddress}
              onChange={(event) => {
                setStreetAddress(event.target.value);
              }}
            />
          </label>
        </div>
        <div className="city">
          <label>
            City {errors.city && <p className="errors">{errors.city}</p>}
            <input
              type="text"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </label>
        </div>
        <div className="state">
          <label>
            State{" "} {errors.state && <p className="errors">{errors.state}</p>}
            <input
              type="text"
              value={state}
              onChange={(event) => {
                setState(event.target.value);
              }}
            />
          </label>
        </div>
        <div className="latitude">
          <label>
            Latitude {errors.latitude && <p className="errors"> {errors.latitude}</p>}
            <input
              type="text"
              value={latitude}
              onChange={(event) => {
                setLatitude(event.target.value);
              }}
            />
          </label>
        </div>
        <div className="longitude">
          <label>
            Longitude {errors.longitude && <p className="errors">{errors.longitude}</p>}
            <input
              type="text"
              value={longitude}
              onChange={(event) => {
                setLongitude(event.target.value);
              }}
            />
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
            Please write at least 30 characters {errors.description && <p className="errors">{errors.description}</p>}
            <textarea
              type="text"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </label>
        </div>
      </div>
      <div className="title">
        <h3>Create a title for your spot</h3>
        <p>
          Catch guests&apos; attention with a spot title that highlights what
          makes your place special
        </p>
        <div className="title-box">
          <label>
            Name of your spot {errors.title && <p className="errors">{errors.title}</p>}
            <input
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            ></input>
          </label>
        </div>
      </div>
      <div className="price">
        <h4>Set a base price for your spot</h4>
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results
        </p>
        <div className="Price-per-night">
          <label>
            $ Price per night (USD){" "} {errors.price && <p className="errors">{errors.price}</p>}
            <input
              type="text"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            ></input>
          </label>
        </div>
      </div>
      <div className="photos">
        <h5>Liven up your spot with photos</h5>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <div className="url1">
          {" "}
          <label>
            Preview Image Url {errors.previewImage && <p className="errors"> {errors.previewImage}</p>}
            <input
              type="text"
              value={previewImage}
              onChange={(event) => setImage1(event.target.value)}
            ></input>
          </label>
        </div>
        <div className="url2">
          <label>
            {" "}
            Image Url {errors.image2 && <p className="errors">{errors.image2}</p>}
            <input
              type="text"
              value={image2}
              onChange={(event) => setImage2(event.target.value)}
            ></input>
          </label>
        </div>
        <div className="url3">
          {" "}
          <label>
            {" "}
            Image Url{errors.image3 && <p className="errors">{errors.image3}</p>}
            <input
              type="text"
              value={image3}
              onChange={(event) => setImage3(event.target.value)}
            ></input>
          </label>
        </div>
        <div className="url4">
          {" "}
          <label>
            {" "}
            Image Url {errors.image4 && <p className="errors">{errors.image4}</p>}
            <input
              type="text"
              value={image4}
              onChange={(event) => setImage4(event.target.value)}
            ></input>
          </label>
        </div>
        <div className="url5">
          {" "}
          <label>
            {" "}
            Image Url {errors.image5 && <p className="errors">{errors.image5}</p>}
            <input
              type="text"
              value={image5}
              onChange={(event) => setImage5(event.target.value)}
            ></input>
          </label>
        </div>
      </div>
      <button onClick={submit}>Create Spot</button>
    </form>
  );
}

export default SpotForm;
