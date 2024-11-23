import BasicCard from "../components/BasicCard";
import Grid from '@mui/material/Grid2';
import { Button, Card } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import MatchResult from "../components/MatchResult";
import { changeRankingPosition } from "../slices/rankingSlice";
import { CircularProgress } from "@mui/material";
import usePlayerData from "../hooks/usePlayerData";
import startMatch from "../utils/startMatch";

const Versus = () => {

    const location = useLocation();
    const challengerPosition = location.state;

    const navigate = useNavigate();

    let ranking = useSelector((state) => state.ranking.value);
    const dispatch = useDispatch();

    const[result, setResult] = useState(null);

    const url = 'https://pokeapi.co/api/v2/pokemon/';
    let { playerData: player1, loading: loading1 } = usePlayerData(url, ranking.find(x => x.position === challengerPosition) );
    let { playerData: player2, loading: loading2 }  = usePlayerData(url, ranking.find(x => x.position === challengerPosition-1) );

    function getMatchResult() {
        player1.index = ranking.findIndex(x => x.position === challengerPosition);
        player2.index = ranking.findIndex(x => x.position === challengerPosition-1);
        const selectedIndex = ranking.findIndex(x => x.selected === true); 
        const { winner, loser, cols, rows, selectedWins } = startMatch(player1, player2, selectedIndex, ranking.at(selectedIndex).name );
        //Se actualiza el ranking: el perdedor con posicion del challenger y el ganador la anterior
        dispatch( changeRankingPosition({winnerIndex: winner.index, loserIndex: loser.index, challengerPosition: challengerPosition}) ) 
        const resultData = <>
            <h3>Ganador {winner.name}</h3>
            <p>{ selectedWins ? `Avanza al puesto ${challengerPosition-1}` : '' }</p>
            <MatchResult rows={rows} columns={cols} />
        </>;
        setResult(resultData);
    }
    
    if(loading1 || loading2){
        return(<CircularProgress/>)
    }
    return (
        <div>
            <h2>Partido</h2>
        <Grid container justify="center" spacing={2}>
            <Grid item >
                <Grid container alignItems="flex-start" justify="center" spacing={2}>
                    <Card sx={{ maxWidth: 250 }}>
                        <BasicCard name={player1.name} position={challengerPosition} front_default={player1.front_default} types={player1.types} />
                    </Card>
                    <Card sx={{ maxWidth: 250 }}>Versus</Card>
                    <Card sx={{ maxWidth: 250 }}>
                        <BasicCard name={player2.name} position={challengerPosition-1} front_default={player2.front_default} types={player2.types} />
                    </Card>
                </Grid>
            </Grid>
            
        </Grid>
        {result==null ? <Button variant="outlined" onClick={getMatchResult}>Iniciar Partido</Button> :
        <Button variant="outlined" onClick={() => {navigate('/ranking')}}>Volver</Button>}
        {result}
        </div>
    );
}
export default Versus;