import Table from '../Table';
import Tasks from '../Tasks';
import CustomCard from '../CustomCard';
import Calendar from 'react-calendar'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';

const HomeScreen = () => {
    const columns = ["DNI", "Nombre y Apellido", "Garantía", "Préstamo", "Opciones"];
    const [prestamos, setPrestamos] = useState([]);
    const [nuevoPrestamo, setNuevoPrestamo] = useState({
        estudiante: "",
        elemento: "",
        garantia: ""
    });
    const agregarPrestamo = async () => {
        try {
            const response = await fetch("http://localhost:8000/prestamos/api/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoPrestamo),
            });

            if (!response.ok) {
            throw new Error("Error al crear préstamo");
            }

            const data = await response.json();
            setPrestamos([...prestamos, data]); // agrega el nuevo registro a la lista
            setNuevoPrestamo({ estudiante: "", elemento: "", garantia: "" });
        } catch (error) {
            console.error("Error al agregar préstamo:", error);
        }
    };
    
    useEffect(() => {
        fetch('http://localhost:8000/prestamos/api/')
        .then((res) => res.json())
        .then((data) => setPrestamos(data))
        .catch((err) => console.error('Error al obtener préstamos:', err));
    }, []);

    
    return <Container className="mt-4 d-flex gap-4 justify-content-between">
        <CustomCard title="Préstamos 5 de agosto" className="col-9 fixed-height-card ">
            <div className="table-wrapper scrollbar">
                <Table columns={columns}>
                    <tr>
                        <td><input type="text" className='form-control'/></td>
                        <td><input type="text" className='form-control'/></td>
                        <td><input type="text" className='form-control'/></td>
                        <td><input type="text" className='form-control'/></td>
                        <td className="text-center fw-bold"><Button id="addPrestamo" className="btn-success"><i className="bi bi-plus-lg fs-6"></i></Button></td>
                    </tr>
                    {prestamos.map((prestamo) => (
                        <tr
                            key={prestamo.id}
                            className={prestamo.devuelto ? 'table-success' : ''}
                        >
                            <td>{prestamo.estudiante.dni}</td>
                            <td>{prestamo.estudiante.apellido}, {prestamo.estudiante.nombre}</td>
                            <td>{prestamo.garantia}</td>
                            <td>{prestamo.elemento}</td>
                            <td className="text-center"><Button className="btn-primary btn-sm text-white"><i className="bi bi-check fs-6"></i></Button><Button className="btn-info btn-sm text-white ms-2"><i className="bi bi-pencil-square fs-6"></i></Button></td>
                        </tr>
                    ))}
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