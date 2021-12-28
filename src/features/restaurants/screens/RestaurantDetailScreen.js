/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { List, Divider, TextInput } from 'react-native-paper';

import { SafeArea } from '../../../components/SafeArea/SafeArea';
import { Spacer } from '../../../components/Spacer/Spacer';
import { RestaurantInfoCard } from '../components/RestaurantInfoCard';
import { OrderButton } from '../components/RestaurantList.styles';

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

export const RestaurantDetailScreen = ({ route, navigation }) => {
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);

  const [icecreams, setIcecreams] = useState([]);
  const [milkshake, setMilkshake] = useState([]);
  const [special, setSpecial] = useState(12);
  const { addToCart } = useContext(CartContext);

  const { restaurant, userPlaceId } = route.params;
  // console.log(userPlaceId)
  var db = firebase.firestore();

  useEffect(() => {
    const fetchData = async () => {
      if (!icecreams.length && !milkshake.length) {
        db.collection('Menu')
          .doc(restaurant.placeId)
          .get()
          .then((querySnapshot) => {
            const result = querySnapshot.data();
            if (result) {
              setIcecreams(result.icecreams);
              setMilkshake(result.milkshake);
              setSpecial(result.Special);
            }
            console.log(querySnapshot.data());
          });
      }
    };

    fetchData();
  }, []);

  const changeIcecreams = async (value, key) => {
    db.collection('Menu')
      .doc(restaurant.placeId)
      .update({ icecreams: icecreams });
  };

  const setNewIcecreams = (value, key) => {
    let newIcecreams = icecreams.map((el, index) =>
      index === key ? value : el
    );

    setIcecreams(newIcecreams);
  };

  const changeMilkshakes = async (value, key) => {
    db.collection('Menu')
      .doc(restaurant.placeId)
      .update({ milkshake: milkshake });
  };

  const setNewMilkshakes = (value, key) => {
    let newMilkshakes = milkshake.map((el, index) =>
      index === key ? value : el
    );

    setMilkshake(newMilkshakes);
  };

  const changeSpecial = async (value) => {
    db.collection('Menu').doc(restaurant.placeId).update({ Special: value });
  };

  //console.log(icecreams, 'icecreams');
  return (
    <SafeArea>
      <ScrollView>
        <RestaurantInfoCard restaurant={restaurant} />
        <List.Accordion
          title="Pierwsze Danie"
          left={(props) => <List.Icon {...props} icon="food-variant" />}
          expanded={breakfastExpanded}
          onPress={() => setBreakfastExpanded(!breakfastExpanded)}
        >
          {icecreams.length ? (
            icecreams?.map((el, key) =>
              restaurant.placeId == userPlaceId ? (
                <View key={key}>
                  <TextInput
                    style={{ marginRight: 7, marginVertical: 5 }}
                    value={el?.toString()}
                    onChangeText={(value) => setNewIcecreams(value, key)}
                    onEndEditing={async (value) =>
                      await changeIcecreams(value.nativeEvent.text, key)
                    }
                  />
                </View>
              ) : (
                <View key={key}>
                  <List.Item title={el?.toString()} />
                  <Divider />
                </View>
              )
            )
          ) : (
            <Text>Ta restauracja nie współpracuje jeszcze z nami !</Text>
          )}
        </List.Accordion>
        <Divider />
        <List.Accordion
          title="Drugie danie"
          left={(props) => <List.Icon {...props} icon="hamburger" />}
          expanded={lunchExpanded}
          onPress={() => setLunchExpanded(!lunchExpanded)}
        >
          {milkshake.length ? (
            milkshake?.map((el, key) =>
              restaurant.placeId == userPlaceId ? (
                <View key={key}>
                  <TextInput
                    style={{ marginRight: 7, marginVertical: 5 }}
                    value={el?.toString()}
                    onChangeText={(value) => setNewMilkshakes(value, key)}
                    onEndEditing={async (value) =>
                      await changeMilkshakes(value.nativeEvent.text, key)
                    }
                  />
                </View>
              ) : (
                <View>
                  <List.Item title={el?.toString()} />
                  <Divider />
                </View>
              )
            )
          ) : (
            <Text>Ta restauracja nie współpracuje jeszcze z nami !</Text>
          )}
        </List.Accordion>
      </ScrollView>
      <Spacer position="bottom" size="large">
        {restaurant.placeId == userPlaceId ? (
          <TextInput
            label="Our Special meal price"
            style={{ marginHorizontal: 10, marginVertical: 10 }}
            value={special}
            numeric
            onChangeText={(value) => setSpecial(value)}
            onEndEditing={async (value) =>
              await changeSpecial(value.nativeEvent.text)
            }
          />
        ) : (
          <OrderButton
            icon="cash-usd"
            mode="contained"
            onPress={() => {
              addToCart(
                { item: 'special', price: parseFloat(special) },
                restaurant
              );
              navigation.navigate('Checkout');
            }}
          >
            Zestaw specjalny tylko {special} PLN!
          </OrderButton>
        )}
      </Spacer>
    </SafeArea>
  );
};
