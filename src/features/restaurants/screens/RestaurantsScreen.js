import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import styled from 'styled-components/native';

import { SafeArea } from '../../../components/SafeArea/SafeArea';
import { FadeInView } from '../../../components/FadeInView/FadeInView';
import { Spacer } from '../../../components/Spacer/Spacer';
import { CustomText as Text } from '../../../components/CustomText/CustomText';
import { Search } from '../components/Search';
import { FavouritesBar } from '../../../components/FavouritesBar/FavouritesBar';
import { RestaurantList } from '../components/RestaurantList.styles';
import { RestaurantInfoCard } from '../components/RestaurantInfoCard';

import { LocationContext } from '../../../services/location/LocationContext';
import { RestaurantsContext } from '../../../services/restaurants/RestaurantsContext';
import { FavouritesContext } from '../../../services/favourites/FavouritesContext';
import { AuthenticationContext } from '../../../services/authentication/AuthenticationContext';
import { SearchIcecream } from '../components/SearchIcecream';

const LoadingContainer = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

export const RestaurantsScreen = ({ navigation }) => {
  const { userPlaceId } = useContext(AuthenticationContext);
  const { error: locationError, location } = useContext(LocationContext);
  const { restaurants, isLoading, error } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const hasError = !!error || !!locationError;

  useEffect(() => {
    setSelectedRestaurants(restaurants);
  }, [restaurants]);

  // console.log(selectedRestaurants, 'selectedRestaurants restSc');

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {location && <SearchIcecream />}

      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      {hasError && (
        <Spacer position="left" size="large">
          <Text variant="error">Something went wrong retrieving the data</Text>
        </Spacer>
      )}
      {!hasError && (
        <RestaurantList
          data={selectedRestaurants}
          renderItem={({ item }) => {
            //  console.log(item.placeId, "item selRest")
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RestaurantDetail', {
                    restaurant: item,
                    userPlaceId: userPlaceId,
                  })
                }
              >
                <Spacer position="bottom" size="large">
                  <FadeInView>
                    <RestaurantInfoCard restaurant={item} />
                  </FadeInView>
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.placeId}
        />
      )}
    </SafeArea>
  );
};
