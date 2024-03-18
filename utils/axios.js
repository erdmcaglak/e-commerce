import axios from "axios";

const baseURL = 'https://dummyjson.com';
const config = {
  baseURL: baseURL,
};

const _axios = axios.create(config);

class AxiosWrapper {
  get(url, config) {
    return _axios.get(url, config);
  }
  delete(url, config) {
    return _axios.delete(url, config);
  }
  head(url, config) {
    return _axios.head(url, config);
  }
  options(url, config) {
    return _axios.options(url, config);
  }
  post(url, data, config) {
    return _axios.post(url, data, config);
  }
  put(url, data, config) {
    return _axios.put(url, data, config);
  }
  patch(url, data, config) {
    return _axios.patch(url, data, config);
  }
  postForm(url, data, config) {
    return _axios.postForm(url, data, config);
  }
  putForm(url, data, config) {
    return _axios.putForm(url, data, config);
  }
  patchForm(url, data, config) {
    return _axios.patchForm(url, data, config);
  }
  getAxios() {
    return _axios;
  }
}

const wrapper = new AxiosWrapper();

export default wrapper;