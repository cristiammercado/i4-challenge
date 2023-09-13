import {FC} from 'react';
import {Button} from 'react-bootstrap';

const HomePage: FC = () => {
  return (
    <div className='text-center mt-4 pt-4'>
      <h1>Bienvenido</h1>
      <hr/>
      <h4 className='pt-1'>¿Que desea hacer?</h4>
      <div className='pt-4'>
        <Button variant='dark' size='lg' href='/appointment-types/create'>
          Crear tipo de cita
        </Button>
        &nbsp;&nbsp;
        <Button variant='dark' size='lg' href='/appointment-types'>
          Listar tipos de cita
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
