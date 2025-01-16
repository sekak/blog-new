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

export default function pagination() {
  return (
    <Pagination >
        <PaginationPrevious className="border h-10 w-10 p-0 mr-6">
            <PaginationLink>Previous</PaginationLink>
        </PaginationPrevious>
        <PaginationContent className="flex gap-3">
            <PaginationItem>
            <PaginationLink>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationLink isActive>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationLink>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationLink>4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationLink>5</PaginationLink>
            </PaginationItem>
            <PaginationEllipsis />
        </PaginationContent>
        <PaginationNext className="border h-10 w-10 p-0 ml-6">
            <PaginationLink>Next</PaginationLink>
        </PaginationNext>
    </Pagination>
  )
}
