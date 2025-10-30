import { useState, useEffect } from "react";
import Select from "react-select";

export default function MultiSelect({ onSelectElementos, value }) {
    const [elementoData, setElementoData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/elementos/")
            .then((res) => res.json())
            .then((data) => {
                const options = data.map((elemento) => ({
                    value: elemento.id,
                    label: `${elemento.nombre}`,
                }));
                setElementoData(options);
            })
            .catch((err) => console.error("Error al obtener elementos:", err));
    }, []);

    // value en el padre es una string de ids separados por coma ("1,2,3")
    const selectedValues = value
        ? elementoData.filter((opt) =>
                value.split(",").includes(String(opt.value))
            )
        : [];

    return (
        <Select
            isMulti
            name="elemento"
            options={elementoData}
            className="basic-multi-select"
            classNamePrefix="select form-control"
            placeholder="Seleccionar"
            onChange={(options) => onSelectElementos(options)}
            value={selectedValues}
        />
    );
}
