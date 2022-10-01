import {useState, useEffect} from 'react'

function Networks(){

    const [networks, setNetworks] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let url = 'http://api.citybik.es/v2/networks'
        const response = await fetch(url, { method: 'GET' })
            .then(response => response.json())
            .catch(error => console.log(error))
        setNetworks(response.networks)
        console.log(networks)
    }

    return(
        <></>
    )
}
export default Networks