import axios from "axios";

axios.defaults.baseURL = "https://od.casepeer.com";
const postUtil = (url, data) => axios.post(url, data);

const putUtil = (url, data) =>
  axios({
    method: "put",
    url,
    data
  });

const patchUtil = (url, data) =>
  axios({
    method: "patch",
    url,
    data
  });

const getUtil = (url, data = null) => axios.get(url, { params: data });

const deleteUtil = (url, data = null) => axios.delete(url, { params: data });

const deleteUtilWithBody = (url, data) =>
  axios({
    method: "delete",
    url,
    data
  });

export {
  postUtil,
  getUtil,
  putUtil,
  patchUtil,
  deleteUtil,
  deleteUtilWithBody
};

axios.interceptors.response.use(
  response => response,
  error => {
    let errorMsg = {};
    if (error.response.status === 400) {
      errorMsg = {
        status: error.response.status,
        message: error.response.data.non_field_errors[0]
      };
    }
    return errorMsg;
  }
);
