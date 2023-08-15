import qs from 'qs';
import { axiosClient } from './axiosClient';

const userFields = ['StateAbb', 'StateName'];

export const getStatesApi = {
  get: () =>
    axiosClient.get('GenReadSys', {
      params: {
        CID: process.env.REACT_APP_CID,
        AK: process.env.REACT_APP_AK,
        sTable: 'Sys_States',
        saFields: userFields,
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    }),
};
