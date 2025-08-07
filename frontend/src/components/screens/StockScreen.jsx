import Table from '../Table';
import Tasks from '../Tasks';
import CustomCard from '../CustomCard';
import Container from 'react-bootstrap/Container';
import 'react-calendar/dist/Calendar.css';

function PrintScreen() {
	const columns = ["Elemento", "Cantidad", "Ubicación", "Estado"];

	return <Container className="mt-4 d-flex gap-4 justify-content-between">
			<CustomCard title="Inventario" className="col-9">
			<Table columns={columns} />
			</CustomCard>

			<div className="col-3">
			<CustomCard title="Entradas">
				<Tasks />
			</CustomCard>

			<CustomCard title="Salidas">
				<Tasks />
			</CustomCard>
			</div>
	</Container>
}

export default PrintScreen;