import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CustomerAPI } from 'api/customerApi';

export const useCreateCustomer = (callback: () => void) => {
  return useMutation(CustomerAPI.createCustomer, {
    onSuccess: () => {
      callback();
    },
  });
};

export const useUpdateCustomer = (callback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(CustomerAPI.updateCustomer, {
    onSuccess: () => {
      queryClient.clear();
      callback();
    },
  });
};

export const useGetCustomerById = (id: number) => {
  return useQuery<any>([`get_user_by_id_${id}`], async () => {
    const { data } = await CustomerAPI.getCustomerById(id);
    return data.data.at(0);
  });
};
