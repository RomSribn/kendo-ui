import qs from 'qs';
import { axiosClient } from './axiosClient';

import editFields from 'data/fields.json';

export const VendorAPI = {
  createVendor: (params: any) =>
    axiosClient.post(
      '/GenCreate',
      { ...params },
      {
        params: {
          CID: process.env.REACT_APP_CID,
          AK: process.env.REACT_APP_AK,
          sTable: 'Ent_Main',
        },
      }
    ),
  updateVendor: (params: any) => {
    const id = params.id;
    delete params.id;

    return axiosClient.patch(
      '/GenUpdate',
      { ...params },
      {
        params: {
          CID: process.env.REACT_APP_CID,
          AK: process.env.REACT_APP_AK,
          sTable: 'Ent_Main',
          iIDNo: id,
        },
      }
    );
  },
  getVendorById: (id: number) =>
    axiosClient.get('/GenRead', {
      params: {
        CID: process.env.REACT_APP_CID,
        AK: process.env.REACT_APP_AK,
        sTable: 'Ent_Main',
        iIDNo: id,
        saFields: editFields,
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    }),
};
