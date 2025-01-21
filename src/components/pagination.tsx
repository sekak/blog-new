'use client'
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  countPage: number;
  numberOfPages: number;
}

export default function PaginationComponent({
  currentPage,
  setCurrentPage,
  countPage,
  numberOfPages,
}: PaginationProps) {
  const maxPages = 5;

  const pageNumbers = [];
  for (let i = 1; i <= numberOfPages; i++) {
    if (
      i >= currentPage - 2 &&
      i <= currentPage + 2 &&
      i > 0 &&
      i <= numberOfPages
    ) {
      pageNumbers.push(i);
    }
  }

  // Move to the next page
  const handleNextPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Move to the previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Pagination>
      {/* Previous button */}
      <PaginationPrevious
        className="border h-10 w-10 p-0 mr-6"
        onClick={handlePrevPage}
        // disabled={currentPage === 1}
      >
        <PaginationLink>Previous</PaginationLink>
      </PaginationPrevious>

      <PaginationContent className="flex gap-3">
        {pageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              isActive={currentPage === pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {numberOfPages > 5 && currentPage < numberOfPages - 2 && <PaginationEllipsis />}
      </PaginationContent>

      {currentPage < numberOfPages - 2 && (
          <>
            <PaginationEllipsis />
            <PaginationItem>
              <PaginationLink onClick={() => setCurrentPage(numberOfPages)}>
                {numberOfPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
      <PaginationNext
        className="border h-10 w-10 p-0 ml-6"
        onClick={handleNextPage}
      >
        <PaginationLink>Next</PaginationLink>
      </PaginationNext>
    </Pagination>
  );
}
