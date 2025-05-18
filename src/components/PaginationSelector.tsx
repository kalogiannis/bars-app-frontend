import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const PaginationSelector = ({ page, pages, onPageChange }: Props) => {
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(page - 1)}
            />
          </PaginationItem>
        )}

        {pageNumbers.map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(number)}
              isActive={page === number}
              className={`
                bg-transparent
                text-white
                hover:bg-gray-400
                ${page === number ? "bg-white text-black" : ""}
              `}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        {page < pages && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => onPageChange(page + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSelector;
