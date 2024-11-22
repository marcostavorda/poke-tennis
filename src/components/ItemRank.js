import useData from "../hooks/useData";
import BasicCard from './BasicCard';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import { Button, CircularProgress } from "@mui/material";

const ItemRank = ({itemName, position, selected}) => {

    const {data, error, loading} = useData(`https://pokeapi.co/api/v2/pokemon/${itemName}`,'get');

    if(loading){
        return (<h2><CircularProgress /></h2>);
    }
    if(error!=null){
        return (<div className="App">
            <Card sx={{ maxWidth: 180 }}>
            <BasicCard name={itemName} position={position} />
            <p>{error}</p>
            {selected!=null && selected && position!=1 ? <Button variant='outlined'>
                <Link to={'/versus'} state={position}>Challenge</Link>
                </Button> : '' }
            </Card>
        </div>);
    }
    return (<div className="App">
        {data==null ? <h3>{itemName}</h3> : (
            <Card sx={{ maxWidth: 180 }}>
                <BasicCard name={data.name} position={position} front_default={data.sprites.front_default} types={data.types} />
                {selected!=null && selected && position!=1 ? <Button variant='outlined'>
                    <Link to={'/versus'} state={position}>Challenge</Link>
                    </Button> : '' }
            </Card>
        )}
    </div>);
}

export default ItemRank;