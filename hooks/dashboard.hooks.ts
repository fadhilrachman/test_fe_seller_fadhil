import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

interface IParams {
  division_id?: string;
  user_id?: string;
  month: string;
  year: string;
}

export const useDashboardAttendance = (params: IParams) => {
  const query = useQuery<any>({
    queryKey: ['DASHBOARD_ATTENDANCE'],
    queryFn: async () => {
      const result = await fetcher.get('/operator/dashboard/attendance', {
        params
      });
      return result.data;
    }
  });

  return query;
};

export const useDashboardShifting = (params: IParams) => {
  const query = useQuery<any>({
    queryKey: ['DASHBOARD_SHIFTING'],
    queryFn: async () => {
      const result = await fetcher.get('/operator/dashboard/shifting', {
        params
      });
      return result.data;
    }
  });

  return query;
};
