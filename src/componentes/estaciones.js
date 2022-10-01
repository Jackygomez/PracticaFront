import { useEffect } from "react"
import { Modal, Button, Card } from 'react-bootstrap'

function Estaciones(props) {

    const estaciones = props.estaciones.stations
    console.log(estaciones)

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
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