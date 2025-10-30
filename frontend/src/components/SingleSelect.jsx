import { useState, useEffect } from "react";
import Select from "react-select";

export default function SingleSelect({
    dataUrl, // URL de donde obtener los datos
    value, // valor seleccionado (id)
    onChange, // callback al seleccionar
    mapOption, // función para mapear cada objeto a {value, label, ...}
    placeholder = "Seleccionar", // texto por defecto
    isClearable = true,
    isSearchable = true,
}) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (!dataUrl) return;

        fetch(dataUrl)
            .then((res) => res.json())
            .then((data) => {
                const mapped = data.map(mapOption);
                setOptions(mapped);
            })
            .catch((err) => console.error("Error al obtener datos:", err));
    }, [dataUrl, mapOption]);

    const handleChange = (option) => {
        onChange(option);
    };

    return (
        <Select
            options={options}
            value={options.find((opt) => opt.value === value) || null}
            onChange={handleChange}
            placeholder={placeholder}
            isClearable={isClearable}
            isSearchable={isSearchable}
            classNamePrefix="select"
            styles={{
                container: (provided) => ({
                    ...provided,
                    width: "150px", // ancho fijo de la caja
                }),
                control: (provided) => ({
                    ...provided,
                    minHeight: "38px", // altura estándar
                    width: "150px", // ancho fijo
                }),
                valueContainer: (provided) => ({
                    ...provided,
                    padding: "0 8px", // ajusta padding si querés
                }),
            }}
        />
    );
}
