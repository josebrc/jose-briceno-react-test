import { useState, useEffect } from "react";

interface UsePaginationResult<T> {
  currentPageData: T[];
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
}

export const usePagination = <T>(
  data: T[],
  itemsPerPage: number
): UsePaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState(1);

  // Recalcular el total de páginas cada vez que cambien los datos
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Actualizar los datos de la página actual
  const currentPageData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reiniciar la página a 1 si cambian los productos o la cantidad por página
  useEffect(() => {
    setCurrentPage(1);
  }, [data, itemsPerPage]);

  return { currentPageData, totalPages, currentPage, goToPage };
};
