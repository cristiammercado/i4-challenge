import {FC, useEffect, useState} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {Button, Card, Container} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {MdDeleteForever, MdEdit} from 'react-icons/md';

import {AppointmentTypesService} from '../../services/AppointmentTypesService.ts';
import {AppointmentType} from '../../types/model/AppointmentType.ts';
import {AppUtils} from '../../utils/AppUtils.ts';
import Placeholder from 'react-bootstrap/Placeholder';
import SuccessMessage from '../../components/ui/SuccessMessage.tsx';
import ConfirmationModal from "../../components/ui/ConfirmationModal.tsx";

const AppointmentTypesDetailPage: FC = () => {
  const {id} = useParams();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const [edited, setEdited] = useState<boolean>(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [appointmentType, setAppointmentType] = useState<AppointmentType | undefined>(undefined);

  const processResponse = (response: AppointmentType | undefined): void => {
    if (!response) {
      window.location.href = '/404';
      return;
    }

    setAppointmentType(response);

    if (searchParams.get('created')) {
      setSuccess(true);
    } else if (searchParams.get('edited')) {
      setEdited(true);
    }

    setLoading(false);
  };

  const confirmDeletion = (affirmative: boolean): void => {
    setDeleteConfirmation(false);

    if (affirmative) {
      setLoading(true);
      AppointmentTypesService
        .delete(appointmentType?.id ?? -1)
        .then(() => window.location.href = '/appointment-types?deleted=true');
    }
  };

  useEffect((): void => {
    const typeId: number = AppUtils.readId(id);

    if (typeId > 0) {
      AppointmentTypesService.read(typeId).then((response: AppointmentType | undefined): void => processResponse(response))
    } else {
      window.location.href = '/404';
    }
  }, []);

  return (
    <Container>
      {deleteConfirmation && <ConfirmationModal callback={confirmDeletion}/>}
      <Row>
        <Col xs={12} md={{span: 6, offset: 3}}>
          {success && <SuccessMessage message={'Se ha creado el tipo de cita correctamente'}/>}
          {edited && <SuccessMessage message={'Se ha editado el tipo de cita correctamente'}/>}
          <Card className='mt-4'>
            {loading &&
              <Placeholder as={Card.Header} animation='glow'>
                <Placeholder xs={6}/>
              </Placeholder>
            }
            {!loading &&
              <Card.Header>
                <h4 className='mb-0 mt-1'>{appointmentType?.name}</h4>
              </Card.Header>
            }
            {loading &&
              <Placeholder as={Card.Body} animation='glow'>
                <Placeholder xs={6}/><br/>
                <Placeholder xs={8}/><br/>
                <Placeholder xs={4}/>
              </Placeholder>
            }
            {!loading &&
              <Card.Body>
                <Card.Text as='div'>
                  <ul className='mb-0'>
                    <li>
                      <b>Duración:</b> {appointmentType?.duration} minutos
                    </li>
                    <li>
                      <b>Descripción:</b> {appointmentType?.description}
                    </li>
                    <li>
                      <b>Color:</b> {appointmentType?.color} <div className='color-demo' style={{backgroundColor: `${appointmentType?.color}`}}>&nbsp;&nbsp;</div>
                    </li>
                    <li>
                      <b>Creado:</b> {appointmentType?.createdAt.toLocaleString()}
                    </li>
                    <li>
                      <b>Última modificación:</b> {appointmentType?.lastModifiedAt.toLocaleString()}
                    </li>
                  </ul>
                </Card.Text>
              </Card.Body>
            }
            {loading &&
              <Placeholder as={Card.Footer} animation='glow' className='d-flex justify-content-end'>
                <Placeholder.Button xs={1} variant='warning'/>
                <Placeholder.Button xs={1} variant='danger' className='ms-2'/>
              </Placeholder>
            }
            {!loading &&
              <Card.Footer className='d-flex justify-content-end'>
                <Button variant='warning' size='sm' href={`/appointment-types/${appointmentType?.id}/edit`}><MdEdit size={20}/></Button>
                <Button variant='danger' size='sm' className='ms-2' onClick={()=>setDeleteConfirmation(true)}><MdDeleteForever size={20}/></Button>
              </Card.Footer>
            }
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentTypesDetailPage;
