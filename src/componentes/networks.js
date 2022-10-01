import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import Estaciones from './estaciones'

function Networks() {

    const [networks, setNetworks] = useState([]) /* CREA LA CONSTANTE NETWORKS DONDE SE ALMACENA LA LISTA DE NETWORKS */
    const [estaciones, setEstaciones] = useState([]) /* CREA LA CONSTANTE DE ESTACIONES DONDE SE ALMACENA LA LISTA DETALLADA DE CADA NETWORK */
    const [modalShow, setModalShow] = useState(false); /* CREA LA CONSTANTE MODALSHOW PARA CONTROLAR SI LA VENTANA MODAL ESTA ABIERTA O CERRADA */

    useEffect(() => { /* INVOCA EL METODO USEEFFECT PARA QUE CUANDO EL COMPONENTE CARGUE SE HAGA LLAMADO A LA FUNCION GETDATA */
        getData()
    }, [])

    const getData = async () => {  /* TRAE EL LISTADO DE NETWORKS DE LA API */
        let url = 'http://api.citybik.es/v2/networks'
        const response = await fetch(url, { method: 'GET' })
            .then(response => response.json())
            .catch(error => console.log(error))
        setNetworks(response.networks)
    }

    const getEstaciones = async (id) => { /*TRAE LA INFO DETALLADA DE CADA UNA DE LAS NETWORKS*/
        let url = `http://api.citybik.es/v2/networks/${id}`
        const response = await fetch(url, { method: 'GET' })
            .then(response => response.json())
            .catch(error => console.log(error))
        setEstaciones(response.network)
        setModalShow(true)
    }
    /* RENDERIZA CADA UNA DE LAS NETWORKS */
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
                onHide={() => setModalShow(false)}> {/* RENDERIZA AL COMPONENTE ESTACIONES PASANDOLE LOS DATOS SHOW Y ESTACIONES */}
            </Estaciones>
        </div>
    )
}
export default Networks