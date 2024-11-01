import { Link } from 'react-router-dom';
import useData from "../hooks/useData";
import BasicCard from './BasicCard';

const ItemCard = ({itemName, url, position}) => {

    const {data, error, loading} = useData(url);

    if(loading){
        return (<h2>...Cargando</h2>);
    }
    if(error!=null){
        return (<><h4>Error cargando {url}</h4>{error}</>);
    }
    if(position!=null){
        const button = position > 1 ? <button>Challenge</button> : '';
        return (<>
            {data==null ? <h3>{position} {itemName}</h3> : (<>
            <BasicCard position={position} data={data} />
            {button}
            </>)}
        </>);
    }
    return (<>
        {data==null ? <h3>{position} {itemName}</h3> : (
        <Link to={`/details/${data.name}`} state={data}>
            <BasicCard position={position} data={data} />
        </Link>
        )}
    </>);
}

export default ItemCard;