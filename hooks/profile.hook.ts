import { fetcher } from '@/lib/fetcher';
import { BaseResponseDetail, BaseResponseList } from '@/types';
import { ProfileType } from '@/types/profile.type';
import { useQuery } from '@tanstack/react-query';

export const useGetProfile = () => {
  const query = useQuery<BaseResponseDetail<ProfileType>>({
    queryKey: ['PROFILE'],
    queryFn: async () => {
      const result = await fetcher.get('/profile');

      return result.data;
    }
  });

  return query;
};
