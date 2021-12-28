/* eslint-disable no-unused-vars */
const url = require('url');
const functions = require('firebase-functions');
const { locations: locationsMock } = require('./geocode.mock');

module.exports.geocodeRequest = (request, response, client) => {
  const { city, mock } = url.parse(request.url, true).query;
  if (mock === 'true') {
    const locationMock = locationsMock[city.toLowerCase()];
    return response.json(locationMock);
  }

  client
    .geocode({
      params: {
        address: city,
        key: 'AIzaSyBZqBqmfgvSILa3OFHkvgwTI_3U2H4WtBk',
      },
      timeout: 5000,
    })
    .then((res) => {
      return response.json(res.data);
    })
    .catch((err) => {
      response.status(400);
      return response.send(err.response.data.error_message);
    });
};
