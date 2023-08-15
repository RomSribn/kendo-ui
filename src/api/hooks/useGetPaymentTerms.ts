import { useQuery } from '@tanstack/react-query';
import { paymentTermsApi } from 'api/paymentTermsApi';

export const useGetPaymentTerms = () => {
  return useQuery<any[]>(
    ['paymentTerms'],
    async () => {
      const { data } = await paymentTermsApi.getPaymentTerms([
        'IDNo',
        'TermsCode',
      ]);
      return data.data;
    },
    {
      initialData: [],
    }
  );
};
