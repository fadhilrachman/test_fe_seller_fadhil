import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

interface BasePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
}

const BasePagination: React.FC<BasePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalItems === 0) {
    return null;
  }

  const isSinglePage = totalPages <= 1;

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center space-x-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                className={`${
                  currentPage === 1 || isSinglePage
                    ? 'cursor-not-allowed opacity-50'
                    : ''
                }`}
                aria-disabled={currentPage === 1 || isSinglePage}
              />
            </PaginationItem>

            {totalPages > 5 && currentPage > 3 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => onPageChange(1)}
                    isActive={currentPage === 1}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                {currentPage > 3 && <PaginationEllipsis />}
              </>
            )}

            {pages
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 2 && page <= currentPage + 2)
              )
              .map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

            {totalPages > 3 && currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && <PaginationEllipsis />}
                <PaginationItem>
                  <PaginationLink
                    onClick={() => onPageChange(totalPages)}
                    isActive={currentPage === totalPages}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < totalPages && onPageChange(currentPage + 1)
                }
                className={`${
                  currentPage === totalPages || isSinglePage
                    ? 'cursor-not-allowed opacity-50'
                    : ''
                }`}
                aria-disabled={currentPage === totalPages || isSinglePage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default BasePagination;
