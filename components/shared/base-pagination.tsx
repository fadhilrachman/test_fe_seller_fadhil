import { useState, useEffect } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface BasePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const BasePagination: React.FC<BasePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  onItemsPerPageChange
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Hide the pagination component if there are no items
  if (totalItems === 0) {
    return null;
  }

  // Disable navigation if there's only one page
  const isSinglePage = totalPages <= 1;

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Menampilkan {itemsPerPage > totalItems ? totalItems : itemsPerPage} dari{' '}
        {totalItems} data
      </div>
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

        {/* Dropdown to select items per page */}
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => onItemsPerPageChange(Number(value))}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="80">80</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BasePagination;
