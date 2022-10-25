import { useState } from "react";

/**
 * Custom hook contains pagination information, reduce boilerplate.
 * @param _pageSize default 10.
 * @param pageNo default 1.
 */
const usePaginationHook = (_pageSize = 10, pageNo = 1) => {
  const [size, setPageSize] = useState(_pageSize);
  const [page, setPage] = useState(pageNo);
  const [total, setTotal] = useState(0);

  function _updatePagination(props: Partial<{ total: number, newSize: number, newPage: number }>) {
    if (props.newSize)
      setPageSize(props.newSize);
    if (props.newPage)
      setPage(props.newPage);
    if (props.total)
      setTotal(props.total);
  }

  return {
    currentPage: page,
    totalRecord: total,
    pageSize: size,
    update: _updatePagination
  };
};

/**
 * get the item number order based on the pagination information.
 * @param indexArray
 * @param currentPage
 * @param pageSize
 */
export function getItemNo(indexArray: number, currentPage: number, pageSize: number) {
  /**
   * example: at page 2, item at index 3 in a pageSize 10 will be:
   *
   *        10           2                     3
   * -> (pageSize * (currentPage - 1)) + (indexArray + 1)
   * -> 14
   */
  return (pageSize * (currentPage - 1)) + (indexArray + 1);
}

export default usePaginationHook;
