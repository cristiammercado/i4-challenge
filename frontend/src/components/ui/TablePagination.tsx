import {FC} from 'react';
import {Pagination} from 'react-bootstrap';

import {TablePaginationProps} from '../../types/props/TablePaginationProps.ts';

const TablePagination: FC<TablePaginationProps> = ({currentPage, totalPages, callback}: TablePaginationProps) => {

  const clickHandler = (page: number): void => {
    if (callback && currentPage !== page) callback(page);
  };

  return (
    <Pagination>
      <Pagination.First disabled={currentPage === 1} onClick={(): void => callback(1)}/>
      <Pagination.Prev disabled={currentPage === 1} onClick={(): void => callback(currentPage - 1)}/>
      {Array.from<number>({length: totalPages}).map((_e2: number, i2: number) => (
        <Pagination.Item key={i2} active={i2 + 1 === currentPage} onClick={() => clickHandler(i2 + 1)}>{i2 + 1}</Pagination.Item>
      ))}
      <Pagination.Next disabled={currentPage === totalPages} onClick={(): void => callback(currentPage + 1)}/>
      <Pagination.Last disabled={currentPage === totalPages} onClick={(): void => callback(totalPages)}/>
    </Pagination>
  );
};

export default TablePagination;
