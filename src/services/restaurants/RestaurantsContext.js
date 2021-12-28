/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, createContext, useContext } from 'react';
import * as firebase from 'firebase';
import { firebaseConfig } from '../../utils/env';
import {
  restaurantsRequest,
  restaurantsTransform,
} from './restaurants.service';

import { LocationContext } from '../location/LocationContext';

export const RestaurantsContext = createContext();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location, iceCream } = useContext(LocationContext);

  var db = firebase.firestore();

  const getRestaurantsWithIcecreams = async (results) => {
    setRestaurants([]);
    let restaurantsId = [];
    db.collection('Menu')
      .where('icecreams', 'array-contains-any', [iceCream.trim().toLowerCase()])
      .get()
      .then((querySnapshot) => {
        // console.log(querySnapshot);
        querySnapshot.forEach((documentSnapshot) => {
          // console.log(documentSnapshot.id);
          restaurantsId.push(documentSnapshot.id);
        });
        // console.log(restaurantsId);
        return restaurantsId;
      })
      .then(async (res) => {
        let withIcecream = results.filter((el) => res.includes(el.placeId));
        //  console.log(withIcecream, '2 restaurantsWithIcecream');
        setError(null);
        setIsLoading(false);
        setRestaurants(withIcecream);
      });
  };

  const retrieveRestaurants = async (loc) => {
    //  setRestaurants([]);
    setIsLoading(true);

    restaurantsRequest(loc)
      .then(restaurantsTransform)
      .then(async (results) => {
        let search = iceCream.trim().toString();
        // console.log(search, "search")
        if (search == '') {
          setError(null);
          setIsLoading(false);
          setRestaurants(results);
        } else {
          await getRestaurantsWithIcecreams(results);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    setRestaurants([]);
    const getRestaurants = async () => {
      if (location) {
        const locationString = `${location.lat},${location.lng}`;
        await retrieveRestaurants(locationString);
      }
    };

    getRestaurants();
  }, [location, iceCream]);

  return (
    <RestaurantsContext.Provider value={{ restaurants, isLoading, error }}>
      {children}
    </RestaurantsContext.Provider>
  );
};
