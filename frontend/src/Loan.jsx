export function Loan(props) {
    return (
        <>
        <tr>
            <td>{props.doc}</td>
            <td>{props.nombre_completo}</td>
            <td>{props.garantia}</td>
            <td>{props.elementos}</td>
        </tr>
        </>
    )
}