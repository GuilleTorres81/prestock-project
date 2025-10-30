import { Modal, Button } from "react-bootstrap";
import Table from "./Table";
import SingleSelect from "./SingleSelect";
import { useState } from "react";

export default function ElementsModal({ show, handleClose, onSave }) {
    const [elementosAgregados, setElementosAgregados] = useState([]);
    const [elementoSeleccionado, setElementoSeleccionado] = useState(null);
    const [labelElemento, setLabelElemento] = useState("");
    const [cantidad, setCantidad] = useState(1);

    const handleSelectElemento = (e) => {
        if (e) {
            setElementoSeleccionado(e);
            setLabelElemento(e.value);
        } else {
            setLabelElemento("");
            setElementoSeleccionado(null);
        }
    };

    const handleAddElemento = () => {
        if (!elementoSeleccionado) return;

        const yaExiste = elementosAgregados.find(
            (e) => e.elemento_id === elementoSeleccionado.value
        );

        if (yaExiste) {
            setElementosAgregados((prev) =>
                prev.map((e) =>
                    e.elemento_id === elementoSeleccionado.value
                        ? { ...e, cantidad: e.cantidad + cantidad }
                        : e
                )
            );
        } else {
            setElementosAgregados((prev) => [
                ...prev,
                {
                    elemento_id: elementoSeleccionado.value,
                    nombre: elementoSeleccionado.label,
                    cantidad,
                },
            ]);
        }
        setElementoSeleccionado(null);
        setCantidad(1);
        setLabelElemento("");
    };

    const handleDelete = (id) => {
        setElementosAgregados((prev) =>
            prev.filter((el) => el.elemento_id !== id)
        );
    };

    const handleGuardar = () => {
        onSave(elementosAgregados);
        handleClose();
    };

    // Construimos un string para mostrar en el input
    const elementosString = elementosAgregados
        .map((el) =>
            el.cantidad > 1 ? `${el.cantidad} ${el.nombre}` : el.nombre
        )
        .join(", ");

    return (
        <Modal show={show} onHide={handleClose} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Elementos a prestar</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Table columns={["Elemento", "Cantidad", "Quitar"]}>
                    <tr>
                        <td>
                            <SingleSelect
                                dataUrl="http://localhost:8000/api/elementos/"
                                value={labelElemento}
                                onChange={handleSelectElemento}
                                mapOption={(el) => ({
                                    value: el.id,
                                    label: el.nombre,
                                })}
                                placeholder="Buscar"
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min="1"
                                className="form-control"
                                value={cantidad}
                                onChange={(e) =>
                                    setCantidad(Number(e.target.value))
                                }
                            />
                        </td>
                        <td>
                            <Button
                                className="btn btn-success btn-sm"
                                onClick={handleAddElemento}
                            >
                                Agregar
                            </Button>
                        </td>
                    </tr>
                    {elementosAgregados.length > 0 ? (
                        elementosAgregados.map((el) => (
                            <tr key={el.elemento_id}>
                                <td>{el.nombre}</td>
                                <td>
                                    <input type="number" className="form-control" defaultValue={el.cantidad} />
                                </td>
                                <td>
                                    <Button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(el.elemento_id)}
                                    >
                                        Borrar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="3"
                                className="text-center fw-bold"
                            >
                                No se han seleccionado elementos para prestar.
                            </td>
                        </tr>
                    )}
                </Table>

                <div className="mt-3">
                    <label>Elementos seleccionados:</label>
                    <input
                        type="text"
                        className="form-control"
                        readOnly
                        value={elementosString}
                        placeholder="No hay elementos agregados"
                    />
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleGuardar}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
