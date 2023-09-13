import {FC} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {Route, Routes} from 'react-router-dom';

import NotFoundPage from './pages/NotFoundPage.tsx';
import HomePage from './pages/HomePage.tsx';
import AppointmentTypesListPage from './pages/appointment-types/AppointmentTypesListPage.tsx';
import AppointmentTypesCreatePage from './pages/appointment-types/AppointmentTypesCreatePage.tsx';
import AppointmentTypesDetailPage from './pages/appointment-types/AppointmentTypesDetailPage.tsx';
import AppointmentTypesEditPage from './pages/appointment-types/AppointmentTypesEditPage.tsx';

const App: FC = () => {
  return (
    <>
      <Navbar bg='dark' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand href='/'>I4 - Especialistas App</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/appointment-types'>Listar</Nav.Link>
              <Nav.Link href='/appointment-types/create'>Crear</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/appointment-types' element={<AppointmentTypesListPage/>}/>
          <Route path='/appointment-types/create' element={<AppointmentTypesCreatePage/>}/>
          <Route path='/appointment-types/:id' element={<AppointmentTypesDetailPage/>}/>
          <Route path='/appointment-types/:id/edit' element={<AppointmentTypesEditPage/>}/>
          <Route path='/404' element={<NotFoundPage/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
