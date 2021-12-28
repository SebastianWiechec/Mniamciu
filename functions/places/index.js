/* eslint-disable no-unused-vars */
const url = require('url');
const functions = require('firebase-functions');
const { mocks, addMockImage } = require('./mock');

const addGoogleImage = (restaurant) => {
  const ref = restaurant.photos[0].photo_reference;
  // console.log(ref);
  if (!ref) {
    restaurant.photos = [
      'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
    ];
    return restaurant;
  }

  restaurant.photos = [
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=AIzaSyBZqBqmfgvSILa3OFHkvgwTI_3U2H4WtBk`,
  ];

  return restaurant;
};

module.exports.placesRequest = (request, response, client) => {
  const { location, mock } = url.parse(request.url, true).query;
  if (mock === 'true') {
    const data = mocks[location];
    if (data) {
      data.results = data.results.map(addMockImage);
    }

    return response.json(data);
  }

  client
    .placesNearby({
      params: {
        location,
        radius: 9000,
        type: ['cafe', 'bar', 'restaurant', 'food'],
        key: 'AIzaSyBZqBqmfgvSILa3OFHkvgwTI_3U2H4WtBk',
      },
      timeout: 5000,
    })
    .then((res) => {
      // console.log(res);
      res.data.results = res.data.results.map(addGoogleImage);
      return response.json(res.data);
    })
    .catch((err) => {
      response.status(400);
      return response.send(err.response.data.error_message);
    });
};
