import "./RestaurantDetails.css";
import restaurauntPlaceholder from "../img/restauraunt-placeholder-large.jpeg";
import React from "react";
import { useParams } from "react-router-dom";
import { get } from "../utils/request";
import Loading from '../components/Loading';
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function RestaurantDetails() {
  let { restaurantId } = useParams();
  const [restaurant, setRestaurant] = React.useState(null);

  if (!cookies.get("groupID")) {
    return (
      <Redirect to={{
        pathname: "/error",
        state: { error: "nogroup" }
      }}
      />)
  }

  if (!cookies.get("user")) {
    return (
      <Redirect to={{
        pathname: "/error",
        state: { error: "nouser" }
      }}
      />)
  }

  if (!cookies.get("cuisine")) {
    return (
      <Redirect to={{
        pathname: "/error",
        state: { error: "nocuisine", next: "/cuisine" }
      }}
      />)
  }

  React.useEffect(() => {
    fetchRestaurant(restaurantId);
  }, []);

  return !restaurant ?
    (<Loading />) :
    (
      <div className="RestaurantDetails">
        <div className="page-container">
          <div className="page-container-item">
            <h3 className="rest-name">The Gourmet Soup and Bread House</h3>
            <img src={restaurauntPlaceholder}></img>
          </div>
          <h4 className="sub-heading">Restauraunt Info</h4>
          <div className="basic-info">
            <p>
              <b>Address:</b> {restaurant.address.formatted || ''}
            </p>
            <p>
              <b>Phone:</b> {restaurant.restaurant_phone ?? ''}
            </p>
            <p>
              <b>Website:</b>{" "}
              <a href={restaurant.restaurant_website}>{restaurant.restaurant_website}</a>
            </p>
            <p>
              <b>Hours:</b> {restaurant.hours}
            </p>
            <p>
              <b>Cuisine Types:</b> {restaurant.cuisines}
            </p>
          </div>
          <div className="page-container-item">
            <h4 className="sub-heading">Directions</h4>
            <div className="map-container">
              <iframe
                width="600"
                height="450"
                loading="lazy"
                className="google-maps-iframe"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?q=${restaurant.geo.lat},${restaurant.geo.lon}&key=AIzaSyB_AxybqGJ-K6-3Jr9efLKXdZX_L7pMJ8I`}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    );

  async function fetchRestaurant(restaurantId) {
    try {
      const data = await get(`/restaurants/${restaurantId}`);

      setRestaurant(data.restaurant[0]);
    } catch (e) {
      console.error(e);
    }
  }
}

export default RestaurantDetails;
