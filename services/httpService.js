const apiToken = process.env.TMDB_API_TOKEN;
const apiUrl = process.env.NEXT_PUBLIC_TMDB_API_URL;

const _fetch = async (method, endPoint, data) => {
  const options = {
    method,
    headers: { Authorization: `Bearer ${apiToken}`, "Content-Type": "application/json" },
  };

  return fetch(`${apiUrl}${endPoint}`, options).then((response) => {
    if (response.ok) return response.json();
    else return Promise.reject(response);
  });
};
function _get(endPoint) {
  return _fetch("GET", endPoint);
}

function _post() {}

function _put() {}

function _delete() {}

const http = {
  get: _get,
  post: _post,
  put: _put,
  delete: _delete,
};

export default http;
