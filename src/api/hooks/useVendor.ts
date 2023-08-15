import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { VendorAPI } from 'api/vendorApi';

export const useCreateVendor = (callback: () => void) => {
  return useMutation(VendorAPI.createVendor, {
    onSuccess: () => {
      callback();
    },
  });
};

export const useUpdateVendor = (callback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(VendorAPI.updateVendor, {
    onSuccess: () => {
      queryClient.clear();
      callback();
    },
  });
};

export const useGetVendorById = (id: number) => {
  return useQuery<any>([`get_vendor_by_id_${id}`], async () => {
    const { data } = await VendorAPI.getVendorById(id);
    return data.data.at(0);
  });
};
