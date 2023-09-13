import {FC} from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {Button} from 'react-bootstrap';
import {MdDeleteForever, MdEdit, MdInfoOutline} from 'react-icons/md';

import {TableButtonsProps} from '../../types/props/TableButtonsProps.ts';
import {BtnAction} from '../../types/enum/BtnAction.ts';

const TableButtons: FC<TableButtonsProps> = ({callback}: TableButtonsProps) => {

  return (
    <div>
      <OverlayTrigger placement='top' overlay={<Tooltip id='tt-top1'>Detalle</Tooltip>}>
        <Button onClick={() => callback(BtnAction.INFO)} variant='primary' size='sm' className='p-1'><MdInfoOutline size={20}/></Button>
      </OverlayTrigger>
      <OverlayTrigger placement='top' overlay={<Tooltip id='tt-top2'>Editar</Tooltip>}>
        <Button onClick={() => callback(BtnAction.EDIT)} variant='warning' size='sm' className='ms-2 p-1'><MdEdit size={20}/></Button>
      </OverlayTrigger>
      <OverlayTrigger placement='top' overlay={<Tooltip id='tt-top3'>Eliminar</Tooltip>}>
        <Button onClick={() => callback(BtnAction.DELETE)} variant='danger' size='sm' className='ms-2 p-1'><MdDeleteForever size={20}/></Button>
      </OverlayTrigger>
    </div>
  );
};

export default TableButtons;
