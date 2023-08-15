import { useQuery } from '@tanstack/react-query';
import { subUsersApi } from 'api/subUsersApi';

export const useGetSubUsers = () => {
  return useQuery<any[]>(
    ['subusers'],
    async () => {
      const { data } = await subUsersApi.get();
      return data.data;
    },
    {
      initialData: [],
    }
  );
};
