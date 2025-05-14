import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/lib/fetcher';

export const usePostUploadFile = () => {
  const mutation = useMutation<
    any,
    Error,
    { file: string; file_name: string; file_type: string }
  >({
    mutationFn: async (body) => {
      const result = await fetcher.post('/upload', body);
      return result.data;
    }
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["DETAIL_COURSE"] }); // Menggunakan invalidateQueries untuk memicu ulang query
    // },
  });

  return mutation;
};
