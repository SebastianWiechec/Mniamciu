import camelize from 'camelize';
import { host, isMock } from '../../utils/env';

export const locationRequest = (searchTerm) => {
  // console.log(searchTerm, 'locationRequest');
  return fetch(`${host}/geocode?city=${searchTerm}&mock=${isMock}`).then(
    (res) => {
      //  console.log(res, 'locationRequest');
      return res.json();
    }
  );
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
