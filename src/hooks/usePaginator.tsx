import { useState } from 'react'



export const usePaginator = (dataTable:any) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedItems = dataTable.slice(startIndex, endIndex);

  const goToNextPage = () => {
    const totalPages = Math.ceil(dataTable.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return {
    goToPreviousPage,
    goToNextPage,
    displayedItems,
    currentPage,
    itemsPerPage
  }
}
