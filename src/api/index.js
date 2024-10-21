import axios from './axios';

function getApi(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then((res) => resolve({ res, err: null }))
      .catch((err) => reject({ res: null, err }));
  });
}
function postApi(url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, config)
      .then((res) => resolve({ res, err: null }))
      .catch((err) => reject({ res: null, err }));
  });
}

export { getApi, postApi };
