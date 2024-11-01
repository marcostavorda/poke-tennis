import { useState } from "react";
import ItemCard from "./ItemCard";
import useData from "../hooks/useData";
import { Link } from "react-router-dom";


const PagedList = () => {

    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');

    const {data, error, loading} = useData(url);

    if(loading){ return <p className="App">Cargando...</p> }
    if(error!=null){
        return (<><h2>Error Paginando</h2>{error}</>);
    }
    return(<ul className="App">
        {data!=null && data.previous!=null ? <button onClick={() => setUrl(data.previous)} >Anterior</button> : <></> }
        {data!=null && data.next!=null ? <button onClick={() => setUrl(data.next)}>Siguiente</button> : <></> }
        {data!=null && data.results.length > 0 ? <><br/>
        <button><Link to={'/ranking'} state={data.results} >Ranking</Link></button>
        {data.results.map((itemList, index) => (
            <Link to={`/details/${itemList.name}`} state={itemList}>
                <ItemCard key={index} itemName={itemList.name} url={itemList.url} />
            </Link>
            )
            )} </>: <>No hay datos</>}
    </ul>);
}

export default PagedList;