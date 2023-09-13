import {FC} from 'react';
import {Alert} from 'react-bootstrap';

import {SuccessMessageProps} from '../../types/props/SuccessMessageProps.ts';

const SuccessMessage: FC<SuccessMessageProps> = ({message}: SuccessMessageProps) => {
  return (
    <>
      <Alert variant='success' dismissible className='mt-4'>
        {message ?? '¡Exitoso!'}
      </Alert>
    </>
  );
};

export default SuccessMessage;
