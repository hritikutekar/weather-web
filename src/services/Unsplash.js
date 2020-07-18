import { UNSPLASH_API, UNSPLASH_API_KEY } from "../utils/constants";

export const getImage = async (query) => {
  let response = await fetch(
    `${UNSPLASH_API}/search/photos?query=${query}&&orientation=portrait&&per_page=20`,
    {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
      },
    }
  );
  let responseJson = await response.json();

  return responseJson.results[Math.floor(Math.random() * 19 + 1)].urls.regular;
};
