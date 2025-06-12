import {Button} from './Button';

export function Sidebar({notas}){
    return (
        
            <div className='card col-3 ms-3 my-3'>
                <div className='card-header'>
                    <h2 className='text-center'>Notas</h2>
                </div>
                <div className='card-body'>
                    {
                        (!notas || notas.length === 0) ? (
                        <>
                            <h2>Aún no hay notas hoy</h2>
                            <div className="d-flex justify-content-center">
                                <Button text="Agregar una nota"/>
                            </div>
                        </>
                        
                    ) : (
                        <ul>
                            {notas.map((nota, index) => (
                                <li key={index}>{nota}</li>
                            ))}
                        </ul>
                    )
                    }
                </div>
            </div>
        
    );
}