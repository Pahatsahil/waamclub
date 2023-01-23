import React from 'react';
import axios from 'axios';

const isEmpty = (obj: any) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

const handleResponse = (response: any, jsonResponse: any) => {
  const jsonRes = isEmpty(jsonResponse) ? {} : jsonResponse;
  const {status} = response;
  const {errors = {}} = Object.assign({}, jsonRes);
  return {status, body: jsonResponse, errors};
};

const RequestAPI = {
  async makeRequest(
    url: string,
    reqData: any,
    type: 'GET' | 'POST' | 'PUT' | 'DELETE',
    callBack: Function,
  ) {
    try {
      await axios(url, {method: type, data: reqData})
        .then(response => {
          callBack(handleResponse(response, response.data));
        })
        .catch(error => {
          callBack(handleResponse(error, error.data));
        });
    } catch (unnone) {}
  },
};

export default RequestAPI
