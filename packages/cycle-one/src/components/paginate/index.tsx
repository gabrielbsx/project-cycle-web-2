import { useEffect, useState } from "react";

interface PaginateProps {
  total: number;
  limit: number;
  page: number;
  onChangePage: (page: number) => void;
}

export const Paginate = ({
  total,
  limit,
  page,
  onChangePage,
}: PaginateProps) => {
  return (
    <div className="flex flex-row justify-center items-center">
      <button
        className={`mr-2 ${
          page === 1
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } rounded-lg text-white font-bold uppercase px-4 py-2`}
        disabled={page === 1}
        onClick={() => {
          onChangePage(page - 1);
        }}
      >
        Anterior
      </button>
      {total > 0 &&
        Array.from(Array(Math.ceil(total / limit)).keys()).map((pageMapped) => (
          <button
            className={`ml-2 ${
              page === pageMapped + 1
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } rounded-lg text-white font-bold uppercase px-4 py-2`}
            key={pageMapped}
            disabled={page === pageMapped + 1}
            onClick={() => {
              onChangePage(pageMapped + 1);
            }}
          >
            {pageMapped + 1}
          </button>
        ))}
      <button
        className={`ml-2 ${
          page === Math.ceil(total / limit)
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } rounded-lg text-white font-bold uppercase px-4 py-2`}
        disabled={page === Math.ceil(total / limit)}
        onClick={() => {
          onChangePage(page + 1);
        }}
      >
        Próximo
      </button>
    </div>
  );
};
