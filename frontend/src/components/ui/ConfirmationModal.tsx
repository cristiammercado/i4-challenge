import {FC, useState} from 'react';

import {ConfirmationModalProps} from '../../types/props/ConfirmationModalProps.ts';
import {Button, Modal} from 'react-bootstrap';

const ConfirmationModal: FC<ConfirmationModalProps> = ({callback}: ConfirmationModalProps) => {
  const [show, setShow] = useState<boolean>(true);

  const handleClose = () => {
    callback(false);
    setShow(false);
  };

  return (
    <Modal show={show} backdrop='static' keyboard={false}>
      <Modal.Header>
        <Modal.Title>Confirmar operación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Desea realmente eliminar este tipo de cita?
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={()=>{
          callback(true);
          handleClose();
        }}>&nbsp;SI&nbsp;</Button>
        <Button variant='outline-dark' onClick={handleClose}>
          NO
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
