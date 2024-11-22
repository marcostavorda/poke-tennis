import useData from "../hooks/useData";
import BasicCard from './BasicCard';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import { CircularProgress } from "@mui/material";
import SelectButton from "./SelectButton";

const ItemCard = ({itemName, url}) => {

    const {data, error, loading} = useData(`https://pokeapi.co/api/v2/pokemon/${itemName}`,'get');

    if(loading){
        return (<><p>{itemName}</p><CircularProgress /></>);
    }
    if(error!=null){
        /*return (<Card sx={{ maxWidth: 180 }}><h4>Error cargando {itemName} {url}</h4>{error}
        </Card>);*/
        return(<Card sx={{ maxWidth: 180 }}>
            <BasicCard name={itemName} />
            <p>{error}</p>
            <SelectButton name={itemName} />
        </Card>)
    }
    return (<>
        {data==null ? <h3>{itemName}</h3> : (
            <Card sx={{ maxWidth: 180 }}>
                <Link to={`/details/${data.name}`} state={data.name}>
                    <BasicCard name={data.name} front_default={data.sprites.front_default} types={data.types}/>
                </Link>
                <SelectButton name={data.name} />
            </Card>
        )}
    </>);
}

export default ItemCard;