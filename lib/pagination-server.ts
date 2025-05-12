export const createPagination = ({
  page,
  total_data,
  per_page,
}: {
  page: number;
  total_data: number;
  per_page: number;
}) => {
  return {
    current: page,
    total_data: total_data,
    total_page: Math.ceil(total_data / per_page),
  };
};
