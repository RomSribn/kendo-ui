import { useQuery } from '@tanstack/react-query';
import { getStatesApi } from 'api/getStates';

export const useGetStates = () => {
  return useQuery<any[]>(
    ['get_states'],
    async () => {
      const { data } = await getStatesApi.get();
      return [...data.data];
    },
    {
      initialData: [],
    }
  );
};
