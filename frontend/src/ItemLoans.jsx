import { Button } from './Button';

export function ItemLoans() {
    return (
        <div className="card m-3 col-8">
            <div className="card-header">
                <div className='d-flex justify-content-center'>
                    <Button text={
                    <>
                        <i class="bi bi-chevron-left"></i>
                    </>
                    } />
                    <h2 className="text-center mx-2">12 de junio de 2025</h2>
                    <Button text={
                        <>
                            <i class="bi bi-chevron-right fw-bold"></i>
                        </>
                    } />
                </div>
            </div>
            <div className="card-body">
                <label htmlFor="buscador">Buscar: </label>
            <input name="buscador" type="text" className="ms-2" />
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Apellido y Nombre</th>
                        <th>Garantía</th>
                        <th>Elementos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="number" /></td>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                        <td><select name="elementos" id="elementos"></select></td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
        )
}