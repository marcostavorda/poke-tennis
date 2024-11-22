import { Button } from "@mui/material";
import ItemRank from "../components/ItemRank";
import Grid from '@mui/material/Grid2';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Ranking = () => {

    const navigate = useNavigate();
    const ranking = useSelector((state) => state.ranking.value);

    useEffect(() => {
        if(ranking.length==0){
            navigate('/');
        }
    }, [])  

    const goToSelection = () => {
        navigate('/');
    }

    return (<div className="App">
    <h2>Ranking</h2>
    <Grid container justify="center" spacing={2}>
        <Grid item xs={10}>
            <Grid container alignItems="flex-start" justify="center" spacing={1}>
                {ranking!=null && ranking.length > 0 ? (ranking.map((itemRank, index) => (
                    <ItemRank key={index} itemName={itemRank.name} position={itemRank.position} selected={itemRank.selected} />)
                    ))
                : ''}
            </Grid>
        </Grid>
    </Grid>
    {ranking.length > 0 && ranking.find(x => x.selected === true).position == 1 ? 
    <h2>Ganador {ranking.find(x => x.selected === true).name}!</h2>  : '' }
    <Button variant="outlined" onClick={goToSelection} >Volver a Seleccionar</Button>
    </div>);
}

export default Ranking;