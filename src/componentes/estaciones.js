import { useCallback, useEffect, useState } from "react"
import { Modal, Card } from 'react-bootstrap'

function Estaciones(props) {

    const estaciones = props.estaciones.stations /* SE LE ASIGNA A LA CONSTANTE ESTACIONES, EL LISTADO DE ESTACIONES QUE VIENEN DEL COMPONENTE NETWORKS */
    const [all_empty_slots, setAllES] = useState() /* CONSTANTE PARA ALMACENAR EL TOTAL DE ESPACIOS LIBRES */
    const [all_free_bikes, setAllFB] = useState() /* CONSTANTE PARA ALMACENAR EL TOTAL DE BICICLETAS LIBRES */

    const contador = useCallback(() => {
        var estaciones_temp = estaciones
        var all_empty_slots = 0
        var all_free_bikes = 0
        for (var i in estaciones_temp) {
            all_empty_slots = all_empty_slots + estaciones_temp[i].empty_slots
            all_free_bikes = all_free_bikes + estaciones_temp[i].free_bikes
        }
        setAllFB(all_free_bikes)
        setAllES(all_empty_slots)
    }, [estaciones]) /*FUNCION QUE CUENTA LAS ESTACIONES Y LAS BICICLETAS LIBRES */

    useEffect(() => {
        if (estaciones){
            contador()
        }
    }, [estaciones, contador]) /*FUNCIÓN QUE VALIDA SI YA SE CARGARON ESTACIONES, SI SÍ, LLAMA AL MEOTODO CONTADOR */

    if (!estaciones){
        return(
            <div></div>
        )
    } /*SI NO HAY ESTACIONES, NO SE RENDERIZA NADA, SI SÍ, SE RENDERIZA UNA VENTANA MODAL CON EL LISTADO DE ESTACIONES */
    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        Total Bicicletas Libres: {all_free_bikes}
                        <br></br>
                        Total Espacios Libres: {all_empty_slots}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        estaciones.length === 0 ? 'No hay estaciones' : estaciones.map((estacion) => {
                            return (
                                <div>
                                    <Card key={estacion.id}>
                                        <Card.Body>
                                            <h5>NOMBRE ESTACION: {estacion.name}</h5>
                                            <h5>BICICLETAS LIBRES: {estacion.free_bikes === null ? 'Sin Info' : estacion.free_bikes}</h5>
                                            <h5>ESPACIOS LIBRES: {estacion.empty_slots === null ? 'Sin Info' : estacion.empty_slots}</h5>
                                            <h5>TOTAL DE ESPACIOS: {estacion.free_bikes + estacion.empty_slots}</h5>
                                        </Card.Body>
                                        <Card.Footer>
                                            <h5>FECHA DE ACTUALIZACION: {estacion.timestamp}</h5>
                                        </Card.Footer>
                                    </Card>
                                    <br></br>
                                </div>
                            )
                        })
                    }
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default Estaciones