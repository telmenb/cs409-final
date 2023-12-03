const baseUrl = 'http://localhost:4000/api';

function getAuthToken() {
  let token;
  try {
    const userObj = JSON.parse(localStorage.getItem('user'));
    token = userObj.token;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return token;
}

function createParamsString(params) {
  return new URLSearchParams(params).toString();
}

export async function getApi(route, params = null) {
  const authToken = getAuthToken();
  const queryString = params ? `?${createParamsString(params)}` : '';
  return fetch(
    baseUrl + route + queryString,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
}

export async function postApi(route, body, params = null) {
  const authToken = getAuthToken();
  const queryString = params ? `?${createParamsString(params)}` : '';
  return fetch(
    baseUrl + route + queryString,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body,
    },
  );
}
