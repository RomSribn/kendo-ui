import qs from 'qs';
import { axiosClient } from './axiosClient';

export const paymentTermsApi = {
  getPaymentTerms: (fields: string[]) =>
    axiosClient.get('/GenReadList', {
      params: {
        CID: process.env.REACT_APP_CID,
        AK: process.env.REACT_APP_AK,
        sTable: 'Set_TermsCodes',
        saFields: fields,
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    }),
};
