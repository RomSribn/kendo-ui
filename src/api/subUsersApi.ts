import qs from 'qs';
import { axiosClient } from './axiosClient';

const userFields = [
  'IDNo',
  'AccIDNo',
  'Company_ID',
  'LoginUserName',
  'FirstName',
  'LastName',
  'MiddleName',
];

export const subUsersApi = {
  get: () =>
    axiosClient.get('GenReadList', {
      params: {
        CID: process.env.REACT_APP_CID,
        AK: process.env.REACT_APP_AK,
        sTable: 'Acc_SubUsers',
        saFields: userFields,
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    }),
};
