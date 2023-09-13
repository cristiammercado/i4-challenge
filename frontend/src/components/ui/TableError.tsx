import {FC} from 'react';
import {Alert, Button} from 'react-bootstrap';

import {TableErrorProps} from '../../types/props/TableErrorProps.ts';

const TableError: FC<TableErrorProps> = ({callback}: TableErrorProps) => {

  const clickHandler = (): void => {
    if (callback) callback();
  };

  return (
    <tbody>
      <tr>
        <td colSpan={4}>
          <Alert variant='danger' className='m-auto w-50'>
            <p>
              Hubo un error al cargar la información. Por favor intente nuevamente.
            </p>
            <hr/>
            <div className='d-flex justify-content-end'>
              <Button onClick={clickHandler} variant='outline-danger' size='sm'>
                Reintentar
              </Button>
            </div>
          </Alert>
        </td>
      </tr>
    </tbody>
  );
};

export default TableError;
