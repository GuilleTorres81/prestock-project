import Table from '../Table';
import Tasks from '../Tasks';
import CustomCard from '../CustomCard';
import Calendar from 'react-calendar'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'react-calendar/dist/Calendar.css';

const HomeScreen = () => {
    const columns = ["DNI", "Nombre y Apellido", "Garantía", "Préstamo", "Opciones"];

    return <Container className="mt-4 d-flex gap-4 justify-content-between">
        <CustomCard title="Préstamos 5 de agosto" className="col-9 fixed-height-card ">
            <div className="table-wrapper scrollbar">
                <Table columns={columns}>
                    <tr>
                        <td><input type="text" className='form-control'/></td>
                        <td><input type="text" className='form-control'/></td>
                        <td><input type="text" className='form-control'/></td>
                        <td><input type="text" className='form-control'/></td>
                        <td className="text-center"><Button className="btn-success"><i className="bi bi-check fs-6"></i></Button></td>
                    </tr>
                    <td colspan="5" className='text-center fw-bold pt-5'>
                        Aún no hay préstamos registrados el día de hoy.
                    </td>
                </Table>
            </div>
        
        </CustomCard>

        <div className="col-3">
        <CustomCard title="Calendario Académico" className="mb-2">
            <div className="justify-content-center d-flex">
            <Calendar  className="border-0"/>
            </div>
        </CustomCard>

        <CustomCard title="Notas">
            <Tasks />
        </CustomCard>
        </div>
  </Container>
}

export default HomeScreen;