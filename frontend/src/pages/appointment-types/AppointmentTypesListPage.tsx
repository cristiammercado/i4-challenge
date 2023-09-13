import {FC, useEffect, useState} from 'react';
import {Container, Row, Table, Toast, ToastContainer} from 'react-bootstrap';
import {NavigateFunction, useNavigate, useSearchParams} from 'react-router-dom';

import {AppointmentType} from '../../types/model/AppointmentType.ts';
import {AppointmentTypesService} from '../../services/AppointmentTypesService.ts';
import {AppointmentTypePage} from '../../types/model/AppointmentTypePage.ts';
import {BtnAction} from '../../types/enum/BtnAction.ts';
import TableButtons from '../../components/ui/TableButtons.tsx';
import TableError from '../../components/ui/TableError.tsx';
import TableLoader from '../../components/ui/TableLoader.tsx';
import TablePagination from '../../components/ui/TablePagination.tsx';
import ConfirmationModal from '../../components/ui/ConfirmationModal.tsx';

const AppointmentTypesListPage: FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [data, setData] = useState<AppointmentType[]>([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [tempId, setTempId] = useState<number>(-1);
  const [deleted, setDeleted] = useState<boolean>(false);

  const downloadPage = (p: number): void => {
    setLoading(true);
    setError(false);

    AppointmentTypesService.getAppointmentTypes(p)
      .then((response: AppointmentTypePage | undefined) => checkResponse(p, response));
  };

  const checkResponse = (page: number, response: AppointmentTypePage | undefined): void => {
    if (!response) {
      setLoading(false);
      setError(true);
      return;
    }

    setPage(page);
    setTotal(response.pages);
    setData(response.content);
    setLoading(false);

    if (searchParams.get('deleted')) {
      setDeleted(true);
    }
  };

  const actionButtons = (id: number, action: BtnAction): void => {
    switch (action) {
      case BtnAction.INFO:
        navigate(`/appointment-types/${id}`);
        break;
      case BtnAction.EDIT:
        navigate(`/appointment-types/${id}/edit`);
        break;
      case BtnAction.DELETE:
        setTempId(id);
        setDeleteConfirmation(true);
        break;
    }
  };

  const paginationCallback = (pageToLoad: number): void => downloadPage(pageToLoad - 1);

  const confirmDeletion = (affirmative: boolean): void => {
    setDeleteConfirmation(false);

    if (affirmative) {
      setLoading(true);
      AppointmentTypesService.delete(tempId).then(() => downloadPage(page));
    }
  };

  useEffect(() => downloadPage(page), []);

  return (
    <Container>
      {deleteConfirmation && <ConfirmationModal callback={confirmDeletion}/>}
      {deleted &&
        <ToastContainer className="p-2" position={'top-center'} style={{ zIndex: 1 }}>
          <Toast onClose={() => {setDeleted(false)}} delay={10000} bg={'success'} autohide>
            <Toast.Header style={{ borderRadius: 5 }}>
              El tipo de cita se ha eliminado correctamente.
            </Toast.Header>
          </Toast>
        </ToastContainer>
      }
      <Row xs={12}>
        <h3 className='mt-3'>Lista de tipos de citas</h3>
        <Table striped bordered hover responsive className='mt-2'>
          <thead>
          <tr>
            <th>Nombre</th>
            <th>Duración (min)</th>
            <th>Última modificación</th>
            <th style={{width: '140px'}} className='text-center'>Acciones</th>
          </tr>
          </thead>
          {loading && <TableLoader/>}
          {error && <TableError callback={() => downloadPage(page)}/>}
          {(!loading && !error && data.length > 0) &&
            <tbody>
            {data.map((appointmentType: AppointmentType) => (
              <tr key={appointmentType.id}>
                <td>{appointmentType.name}</td>
                <td>{appointmentType.duration}</td>
                <td>{appointmentType.lastModifiedAt.toLocaleString()}</td>
                <td style={{width: '140px'}} className='text-center'>
                  <TableButtons callback={(action: BtnAction): void => actionButtons(appointmentType.id, action)}/>
                </td>
              </tr>
            ))}
            </tbody>
          }
          {(!loading && !error && data.length === 0) &&
            <tbody>
            <tr>
              <td colSpan={4} className='text-center py-3'>
                No hay registros para mostrar
              </td>
            </tr>
            </tbody>
          }
        </Table>
        {(!loading && !error && total > 1) &&
          <div className='w-100 d-flex justify-content-center'>
            <TablePagination currentPage={page + 1} totalPages={total} callback={paginationCallback}/>
          </div>
        }
      </Row>
    </Container>
  );
};

export default AppointmentTypesListPage;
