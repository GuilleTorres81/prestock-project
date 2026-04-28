import Table from "../Table";
import Tasks from "../Tasks";
import CustomCard from "../CustomCard";
import Calendar from "react-calendar";
import Container from "react-bootstrap/Container";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import SingleSelect from "../SingleSelect";
import ElementsModal from "../ElementsModal";

function HomeScreen() {
    const columns = [
        "DNI",
        "Nombre y Apellido",
        "Garantía",
        "Préstamo",
        "Opciones",
    ];
    const [prestamos, setPrestamos] = useState([]);
    const [nombreCompleto, setNombreCompleto] = useState("");
    // Inputs
    const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null); // objeto estudiante o null
    const [garantia, setGarantia] = useState("");

    // Devolver prestamo
    const [devuelto, setDevuelto] = useState(false);
    const devolverPrestamo = async (prestamoId) => {
        try {
            const res = await fetch(
                `http://localhost:8000/api/prestamos/${prestamoId}/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        devuelto: true,
                        fecha_devolucion: new Date().toISOString(),
                    }),
                }
            );

            if (!res.ok) throw new Error(`Error ${res.status}`);

            // ✅ Actualizar solo ese préstamo en la lista
            setPrestamos((prev) =>
                prev.map((p) =>
                    p.id === prestamoId ? { ...p, devuelto: true } : p
                )
            );
        } catch (error) {
            console.error("Error al devolver préstamo:", error);
            alert("Ocurrió un error al devolver el préstamo.");
        }
    };

    // Elementos modal
    const [elementosSeleccionados, setElementosSeleccionados] = useState([]);
    const elementosTexto =
        elementosSeleccionados.length > 0
            ? elementosSeleccionados
                  .map((el) =>
                      el.cantidad > 1
                          ? `${el.cantidad} ${el.nombre}`
                          : el.nombre
                  )
                  .join(", ")
            : "Añadir elementos";
    // Modal
    const [showElementsModal, setShowElementsModal] = useState(false);
    const [prestamoEditando, setPrestamoEditando] = useState(null);

    const abrirModalEdicion = (prestamo) => {
        const elementosIniciales = prestamo.detalle_elementos.map((de) => ({
            elemento_id: de.elemento_id,
            nombre: de.elemento.nombre,
            cantidad: de.cantidad,
        }));
        setPrestamoEditando({ id: prestamo.id, elementosIniciales });
        setShowElementsModal(true);
    };

    const editarPrestamo = async (elementos) => {
        if (!prestamoEditando) return;
        const estudiante = prestamos.find((p) => p.id === prestamoEditando.id).estudiante;
        try {
            const res = await fetch(
                `http://localhost:8000/api/prestamos/${prestamoEditando.id}/`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ estudiante_id: estudiante.id, elementos }),
                }
            );
            if (!res.ok) throw new Error(`Error ${res.status}`);
            fetch("http://localhost:8000/api/prestamos/")
                .then((r) => r.json())
                .then((data) => setPrestamos(data));
        } catch (error) {
            console.error("Error al editar préstamo:", error);
            alert("Ocurrió un error al editar el préstamo.");
        } finally {
            setPrestamoEditando(null);
        }
    };
    const handleSelectEstudiante = (est) => {
        if (est) {
            setNombreCompleto(`${est.apellido}, ${est.nombre}`);
            setEstudianteSeleccionado(est.value);
        } else {
            setNombreCompleto("");
            setEstudianteSeleccionado(null);
        }
    };

    // Cargar datos iniciales
    useEffect(() => {
        fetch("http://localhost:8000/api/prestamos/")
            .then((res) => res.json())
            .then((data) => setPrestamos(data))
            .catch((err) => console.error("Error al obtener préstamos:", err));
    }, []);

    const agregarPrestamo = async () => {
        if (!estudianteSeleccionado) {
            alert("Seleccioná o ingresá un DNI válido de estudiante.");
            return;
        }

        const payload = {
            estudiante_id: estudianteSeleccionado,
            elementos: elementosSeleccionados,
            garantia: garantia || "",
        };

        try {
            const res = await fetch("http://localhost:8000/api/prestamos/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Error ${res.status}: ${text}`);
            }

            // const nuevo = await res.json();

            // Si el serializer de lectura devuelve nested estudiante/elemento, puede que necesites volver a fetchear la lista
            // Aquí asumimos que la respuesta post devuelve el objeto creado con ids (o el serializerWrite)
            // Para mantener coherencia con la lista (que usa PrestamoReadSerializer), fetchear de nuevo:
            fetch("http://localhost:8000/api/prestamos/")
                .then((r) => r.json())
                .then((data) => setPrestamos(data));

            // limpiar inputs
            setEstudianteSeleccionado(null);
            setNombreCompleto("");
            setGarantia("");
            setElementosSeleccionados([]);
        } catch (error) {
            console.error("Error al agregar préstamo:", error);
            alert(
                "Ocurrió un error al agregar el préstamo. Revisá la consola."
            );
        }
    };

    return (
        <Container className="mt-4 d-flex gap-4 justify-content-between">
            <CustomCard
                title="Préstamos 5 de agosto"
                className="col-9 fixed-height-card "
            >
                <div className="table-wrapper scrollbar">
                    <Table columns={columns}>
                        <tr>
                            <td>
                                <SingleSelect
                                    dataUrl="http://localhost:8000/api/estudiantes/"
                                    value={estudianteSeleccionado}
                                    onChange={handleSelectEstudiante}
                                    mapOption={(est) => ({
                                        value: est.id,
                                        label: `${est.dni}`,
                                        nombre: est.nombre,
                                        apellido: est.apellido,
                                    })}
                                    placeholder="Buscar"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={nombreCompleto}
                                    disabled
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={garantia}
                                    onChange={(e) =>
                                        setGarantia(e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip>{elementosTexto}</Tooltip>
                                    }
                                >
                                    <Button
                                        className="text-center"
                                        variant="light"
                                        style={{
                                            width: "250px", // ancho fijo
                                            whiteSpace: "nowrap", // evitar salto de línea
                                            overflow: "hidden", // recortar exceso
                                            textOverflow: "ellipsis", // poner "..." si desborda
                                        }}
                                        onClick={() =>
                                            setShowElementsModal(true)
                                        }
                                    >
                                        {elementosTexto}
                                    </Button>
                                </OverlayTrigger>
                            </td>
                            <td className="text-center fw-bold">
                                <Button
                                    id="addPrestamo"
                                    className="btn-success"
                                    onClick={agregarPrestamo}
                                >
                                    <i className="bi bi-plus-lg fs-6"></i>
                                </Button>
                            </td>
                        </tr>
                        {prestamos.length > 0 ? (
                            prestamos.map((prestamo) => (
                                <tr
                                    key={prestamo.id}
                                    className={
                                        prestamo.devuelto ? "table-success" : ""
                                    }
                                >
                                    <td>{prestamo.estudiante.dni}</td>
                                    <td>
                                        {prestamo.estudiante.apellido},{" "}
                                        {prestamo.estudiante.nombre}
                                    </td>
                                    <td>{prestamo.garantia}</td>
                                    <td
                                        style={{
                                            maxWidth: "250px", // ancho máximo de la celda
                                            whiteSpace: "nowrap", // evita que el texto haga salto de línea
                                            overflow: "hidden", // recorta el exceso de texto
                                            textOverflow: "ellipsis", // muestra "..." si se desborda
                                        }}
                                        title={prestamo.detalle_elementos
                                            .map((de) =>
                                                de.cantidad > 1
                                                    ? `${de.cantidad} ${de.elemento.nombre}`
                                                    : de.elemento.nombre
                                            )
                                            .join(", ")} // tooltip nativo al pasar el mouse
                                    >
                                        {prestamo.detalle_elementos
                                            .map((de) =>
                                                de.cantidad > 1
                                                    ? `${de.cantidad} ${de.elemento.nombre}`
                                                    : de.elemento.nombre
                                            )
                                            .join(", ")}
                                    </td>

                                    <td>
                                        <div className="d-flex justify-content-between align-items-center gap-2">
                                            {!prestamo.devuelto ? (
                                                <>
                                                    <Button
                                                        className="btn-primary btn-sm text-white"
                                                        onClick={() =>
                                                            devolverPrestamo(
                                                                prestamo.id
                                                            )
                                                        }
                                                    >
                                                        <i className="bi bi-check fs-6"></i>
                                                    </Button>

                                                    <Button
                                                        className="btn-info btn-sm text-white"
                                                        onClick={() => abrirModalEdicion(prestamo)}
                                                    >
                                                        <i className="bi bi-pencil-square fs-6"></i>
                                                    </Button>
                                                </>
                                            ) : (
                                                <span className="text-success fw-semibold">
                                                    Devuelto
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center fw-bold pt-4"
                                >
                                    Aún no hay préstamos registrados el día de
                                    hoy.
                                </td>
                            </tr>
                        )}
                    </Table>
                </div>
            </CustomCard>

            <div className="col-3">
                <CustomCard title="Calendario Académico" className="mb-2">
                    <div className="justify-content-center d-flex">
                        <Calendar className="border-0" />
                    </div>
                </CustomCard>

                <CustomCard title="Notas">
                    <Tasks />
                </CustomCard>
            </div>
            <ElementsModal
                show={showElementsModal}
                handleClose={() => { setShowElementsModal(false); setPrestamoEditando(null); }}
                onSave={prestamoEditando ? editarPrestamo : (elementos) => setElementosSeleccionados(elementos)}
                elementosIniciales={prestamoEditando?.elementosIniciales ?? []}
            />
        </Container>
    );
}

export default HomeScreen;
