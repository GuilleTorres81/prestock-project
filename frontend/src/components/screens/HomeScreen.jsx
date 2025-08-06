import Table from '../Table';
import Tasks from '../Tasks';
import CustomCard from '../CustomCard';
import Calendar from 'react-calendar'
import Container from 'react-bootstrap/Container';
import 'react-calendar/dist/Calendar.css';

const HomeScreen = () => {
    const columns = ["DNI", "Nombre y Apellido", "Garantía", "Préstamo"];

    return <Container className="mt-4 d-flex gap-4 justify-content-between">
        <CustomCard title="Préstamos 5 de agosto" className="col-9">
        <Table columns={columns}>
            <tr>
                <td>12345678</td>
                <td>Juan Pérez</td>
                <td>Cheque</td>
                <td>$1000</td>
            </tr>
        </Table>
        </CustomCard>

        <div className="col-3">
        <CustomCard title="Calendario Académico" className="mb-2">
            <div className="justify-content-center d-flex">
            <Calendar />
            </div>
        </CustomCard>

        <CustomCard title="Notas">
            <Tasks />
        </CustomCard>
        </div>
  </Container>
}

export default HomeScreen;