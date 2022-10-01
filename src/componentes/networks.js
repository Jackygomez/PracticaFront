import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import Estaciones from './estaciones'

function Networks() {

    const [networks, setNetworks] = useState([])
    const [estaciones, setEstaciones] = useState([])
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let url = 'http://api.citybik.es/v2/networks'
        const response = await fetch(url, { method: 'GET' })
            .then(response => response.json())
            .catch(error => console.log(error))
        setNetworks(response.networks)
    }

    const getEstaciones = async (id) => {
        let url = `http://api.citybik.es/v2/networks/${id}`
        const response = await fetch(url, { method: 'GET' })
            .then(response => response.json())
            .catch(error => console.log(error))
        setEstaciones(response.network)
        setModalShow(true)
    }

    return (
        <div className='cards__container'>
            {
                networks.map((network) => {
                    return (
                        <div key={network.id}>
                            <center>
                                <Card className='Card'>
                                    <Card.Title>{network.name}</Card.Title>
                                    <Card.Body>
                                        <h5>PAIS: {network.location.country}</h5>
                                        <h5>CIUDAD: {network.location.city}</h5>
                                        <h5>RED: {network.name}</h5>
                                        <h5>COMPAÑIA: {network.company}</h5>
                                    </Card.Body>
                                    <Button onClick={() => getEstaciones(network.id)}>Estaciones</Button>
                                </Card>
                            </center>
                        </div>
                    )
                })
            }
            <Estaciones
                estaciones={estaciones}
                show={modalShow}
                onHide={() => setModalShow(false)}>
            </Estaciones>
        </div>
    )
}
export default Networks