import {FC, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {Container} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

import {AppointmentTypeDTO} from '../../types/dto/AppointmentTypeDTO.ts';
import {AppointmentTypesService} from '../../services/AppointmentTypesService.ts';
import ErrorMessage from '../../components/ui/ErrorMessage.tsx';
import {AppointmentType} from '../../types/model/AppointmentType.ts';

const AppointmentTypesCreatePage: FC = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('Ha ocurrido un error inesperado. Intente nuevamente.');

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
      name: form.name.value,
      description: form.description.value,
      duration_minutes: form.duration.value,
      color_hex_code: form.color.value
    };

    AppointmentTypesService.create(data)
      .then((response: AppointmentType | undefined): void => {
        if (!response) {
          setError(true);
          setErrorMessage('Este nombre ya existe. Intenta con otro.');
          setLoading(false);
          return;
        }

        window.location.href = `/appointment-types/${response.id}?created=true`;
      });
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={{span: 6, offset: 3}}>
          <h3 className='pt-3'>Crear tipo de cita</h3>
          <hr/>
          {error && <ErrorMessage message={errorMessage}/>}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className='mb-3'>
              <Form.Group as={Col} md={8} controlId='name'>
                <Form.Label>Nombre</Form.Label>
                <Form.Control placeholder='Ej: Odontología por primera vez' minLength={1} maxLength={255} disabled={loading} required/>
                <Form.Control.Feedback type='invalid'>Este campo es requerido</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={4} controlId='duration'>
                <Form.Label>Duración (min)</Form.Label>
                <Form.Control placeholder='Ej: Odontología por primera vez' type='number' min={1} max={2147483647} defaultValue={30} disabled={loading} required/>
                <Form.Control.Feedback type='invalid'>Digita un número entre 1 y 2147483647</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} md={9} controlId='description'>
                <Form.Label>Descripción</Form.Label>
                <Form.Control as='textarea' rows={2} disabled={loading}/>
              </Form.Group>

              <Form.Group as={Col} md={3} controlId='color'>
                <Form.Label>Color</Form.Label>
                <Form.Control type='color' defaultValue='#FF0000' title='Selecciona un color' disabled={loading} required/>
                <Form.Control.Feedback type='invalid'>Este campo es requerido</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button variant='dark' type='submit' className='mt-4' disabled={loading}>
              {loading ? <><Spinner as='span' animation='border' size='sm'/>&nbsp;&nbsp;Registrando&hellip;</> : 'Registrar'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentTypesCreatePage;
