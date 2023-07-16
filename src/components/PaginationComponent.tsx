import React from "react";
import ReactPaginate from "react-paginate";
import { GrFormNext } from "react-icons/gr";

const PaginationComponent = ({ totalPages, currentPage, setCurrentPage }: { totalPages: number; currentPage: number; setCurrentPage: React.Dispatch<React.SetStateAction<number>> }) => {
  const HandlePageChange = (data: any) => {
    setCurrentPage(data?.selected + 1);
  };

  return (
    <div className="flex justify-end w-full px-[32px] pb-5">
      {/* <div>Show 10 from {totalPages * 10} users</div> */}
      <div>
        <ReactPaginate
          className="flex items-center"
          pageClassName="relative inline-flex text-[#787473] items-center px-4 py-2 text-sm font-semibold text-gray-900 "
          containerClassName="isolate inline-flex -space-x-px rounded-md shadow-sm"
          activeClassName="bg-primary-1/30 rounded text-pink-600"
          pageRangeDisplayed={5}
          renderOnZeroPageCount={null}
          nextLabel={<GrFormNext className="ml-2" />}
          previousLabel={<GrFormNext className="rotate-180 mr-3" />}
          marginPagesDisplayed={1}
          onPageChange={HandlePageChange}
          pageCount={totalPages}
        />
      </div>
    </div>
  );
};

export default PaginationComponent;
