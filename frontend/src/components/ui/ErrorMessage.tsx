import {FC} from 'react';
import {Alert} from 'react-bootstrap';

import {ErrorMessageProps} from '../../types/props/ErrorMessageProps.ts';

const ErrorMessage: FC<ErrorMessageProps> = ({message}: ErrorMessageProps) => {
  return (
    <>
      <Alert variant='danger' dismissible>
        {message ?? 'Hubo un error al cargar la información. Por favor intente nuevamente.'}
      </Alert>
    </>
  );
};

export default ErrorMessage;
