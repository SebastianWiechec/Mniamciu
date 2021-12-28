/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { SafeArea } from '../../../components/SafeArea/SafeArea';
import { Spacer } from '../../../components/Spacer/Spacer';
import { CartContext } from '../../../services/cart/CartContext';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBZqBqmfgvSILa3OFHkvgwTI_3U2H4WtBk',
  authDomain: 'icespotting.firebaseapp.com',
  projectId: 'icespotting',
  storageBucket: 'icespotting.appspot.com',
  messagingSenderId: '729160709089',
  appId: '1:729160709089:android:7f55c031a5957c4cf258a0',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const MenuScreen = ({ route, navigation }) => {
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);
  const { addToCart } = useContext(CartContext);
  var db = firebase.firestore();
  const colref = db.collection('Menu');

  useEffect(() => {
    // console.log(colref);

    const fetchCat = async () => {
      const querySelector = await colref.get();
      const cats = querySelector.docs.map((item) => item.data());
      console.log(cats[0].collection('lody'));
    };

    db.collection('Menu')
      .doc('ChIJvQ6JzxUND0cR7zJYqvyDxOc')

      //1miUC5Qv0sqX8TBkYS2G
      // .collection('smak')
      // .doc('1miUC5Qv0sqX8TBkYS2G') //1miUC5Qv0sqX8TBkYS2G
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot.data());
        // querySnapshot.forEach((doc) => {
        //   console.log(doc.id, ' => ', doc.data());
        // });
      });

    // fetchCat();
  }, []);

  // const { restaurant } = route.params;

  return (
    <SafeArea>
      <ScrollView>
        <List.Accordion
          title="Breakfast"
          left={(props) => <List.Icon {...props} icon="food-croissant" />}
          expanded={breakfastExpanded}
          onPress={() => setBreakfastExpanded(!breakfastExpanded)}
        >
          <List.Item title="Eggs Benedict" />
          <Divider />
          <List.Item title="Blueberry Pancakes" />
          <Divider />
          <List.Item title="Cinnamon Buns" />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title="Lunch"
          left={(props) => <List.Icon {...props} icon="hamburger" />}
          expanded={lunchExpanded}
          onPress={() => setLunchExpanded(!lunchExpanded)}
        >
          <List.Item title="Smørrebrød" />
          <Divider />
          <List.Item title="Steak Burger" />
          <Divider />
          <List.Item title="Pumpkin Soup" />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title="Dinner"
          left={(props) => <List.Icon {...props} icon="glass-cocktail" />}
          expanded={dinnerExpanded}
          onPress={() => setDinnerExpanded(!dinnerExpanded)}
        >
          <List.Item title="Spaghetti Carbonara" />
          <Divider />
          <List.Item title="Veal Cutlet with Chicken Mushroom Rotini" />
          <Divider />
          <List.Item title="Steak Frites" />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title="Drinks"
          left={(props) => <List.Icon {...props} icon="coffee" />}
          expanded={drinksExpanded}
          onPress={() => setDrinksExpanded(!drinksExpanded)}
        >
          <List.Item title="Americano" />
          <Divider />
          <List.Item title="Cappuccino" />
          <Divider />
          <List.Item title="Mocha Latte" />
          <Divider />
          <List.Item title="Earl Grey" />
          <Divider />
          <List.Item title="Maghrebi Mint Tea" />
          <Divider />
          <List.Item title="Coke" />
        </List.Accordion>
      </ScrollView>
      <Spacer position="bottom" size="large" />
    </SafeArea>
  );
};
