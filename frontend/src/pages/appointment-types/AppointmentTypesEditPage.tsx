import {FC, useEffect, useState} from 'react';
import {Button, Container} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Placeholder from 'react-bootstrap/Placeholder';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import {useParams} from 'react-router-dom';

import {AppUtils} from '../../utils/AppUtils.ts';
import {AppointmentTypesService} from '../../services/AppointmentTypesService.ts';
import {AppointmentType} from '../../types/model/AppointmentType.ts';
import {AppointmentTypeDTO} from '../../types/dto/AppointmentTypeDTO.ts';
import ErrorMessage from '../../components/ui/ErrorMessage.tsx';

const AppointmentTypesEditPage: FC = () => {
  const {id} = useParams();

  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('Ha ocurrido un error inesperado. Intente nuevamente.');
  const [validated, setValidated] = useState<boolean>(false);
  const [appointmentType, setAppointmentType] = useState<AppointmentType | undefined>(undefined);

  const processResponse = (response: AppointmentType | undefined): void => {
    if (!response) {
      window.location.href = '/404';
      return;
    }

    setAppointmentType(response);
    setInitialLoading(false);
  };

  useEffect((): void => {
    const typeId: number = AppUtils.readId(id);

    if (typeId > 0) {
      AppointmentTypesService.read(typeId).then((response: AppointmentType | undefined): void => processResponse(response))
    } else {
      window.location.href = '/404';
    }
  }, []);

  const handleSubmit = (event: any): void => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    setValidated(true);
    setLoading(true);

    sendToServer(form);
  };

  const sendToServer = (form: any): void => {
    const data: AppointmentTypeDTO = {
      id: appointmentType?.id,
      name: form.name.value,
      description: form.description.value,
      duration_minutes: form.duration.value,
      color_hex_code: form.color.value
    };

    AppointmentTypesService.update(appointmentType?.id ?? -1, data)
      .then((response: AppointmentType | undefined): void => {
        if (!response) {
          setError(true);
          setErrorMessage('Este nombre ya existe. Intenta con otro.');
          setLoading(false);
          return;
        }

        window.location.href = `/appointment-types/${response.id}?edited=true`;
      });
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={{span: 6, offset: 3}}>
          <h3 className='pt-3'>Editar tipo de cita</h3>
          <hr/>
          {error && <ErrorMessage message={errorMessage}/>}

          {initialLoading &&
            <Row>
              <Placeholder xs={8} animation='glow' size='lg'>
                <Placeholder xs={4} size='lg'/>
                <Placeholder xs={12} size='lg'/>
              </Placeholder>
              <Placeholder xs={4} animation='glow' size='lg' className='mb-4'>
                <Placeholder xs={9} size='lg'/>
                <Placeholder xs={12} size='lg'/>
              </Placeholder>
              <Placeholder xs={9} animation='glow' size='lg' className='mb-4'>
                <Placeholder xs={5} size='lg'/>
                <Placeholder xs={12} size='lg'/>
                <Placeholder xs={12} size='lg'/>
              </Placeholder>
              <Placeholder xs={3} animation='glow' size='lg'>
                <Placeholder xs={7} size='lg'/>
                <Placeholder xs={7} size='lg'/>
              </Placeholder>
              <Placeholder xs={12} animation='glow' size='lg'>
                <Placeholder.Button variant='primary' xs={3}/>
              </Placeholder>
            </Row>
          }

          {!initialLoading &&
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className='mb-3'>
                <Form.Group as={Col} md={8} controlId='name'>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control defaultValue={appointmentType?.name} placeholder='Ej: Odontología por primera vez' minLength={1} maxLength={255} disabled={loading} required/>
                  <Form.Control.Feedback type='invalid'>Este campo es requerido</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md={4} controlId='duration'>
                  <Form.Label>Duración (min)</Form.Label>
                  <Form.Control defaultValue={appointmentType?.duration} placeholder='Ej: Odontología por primera vez' type='number' min={1} max={2147483647} disabled={loading} required/>
                  <Form.Control.Feedback type='invalid'>Digita un número entre 1 y 2147483647</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} md={9} controlId='description'>
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control defaultValue={appointmentType?.description} as='textarea' rows={2} disabled={loading}/>
                </Form.Group>

                <Form.Group as={Col} md={3} controlId='color'>
                  <Form.Label>Color</Form.Label>
                  <Form.Control defaultValue={appointmentType?.color}  type='color' title='Selecciona un color' disabled={loading} required/>
                  <Form.Control.Feedback type='invalid'>Este campo es requerido</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Button variant='dark' type='submit' className='mt-4' disabled={loading}>
                {loading ? <><Spinner as='span' animation='border' size='sm'/>&nbsp;&nbsp;Actualizando&hellip;</> : 'Actualizar'}
              </Button>
            </Form>
          }
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentTypesEditPage;
