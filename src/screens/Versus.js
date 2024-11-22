import BasicCard from "../components/BasicCard";
import Grid from '@mui/material/Grid2';
import { Button, Card } from "@mui/material";
import useData from "../hooks/useData";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import MatchResult from "../components/MatchResult";
import { addRankingElements } from "../slices/rankingSlice";
import { CircularProgress } from "@mui/material";

const Versus = () => {

    const location = useLocation();
    const challengerPosition = location.state;

    const navigate = useNavigate();

    let ranking = useSelector((state) => state.ranking.value);
    const dispatch = useDispatch();

    const[result, setResult] = useState(null);

    function getPositionIndex(place){
        return ranking.findIndex(x => x.position === place);
    }

    function getSelectedName(){
        return ranking.find(x => x.selected === true).name;
    }

    const player1Index = getPositionIndex(challengerPosition);
    const player2Index = getPositionIndex(challengerPosition-1);
    const name1 = ranking.at(player1Index).name;
    const name2 = ranking.at(player2Index).name;
    
    let { data: player1Data, loading: loading1, error: error1 } = useData(`https://pokeapi.co/api/v2/pokemon/${name1}`,'get');
    let { data: player2Data, loading: loading2, error: error2 } = useData(`https://pokeapi.co/api/v2/pokemon/${name2}`,'get');

    let player1 = {name: name1, position: ranking.at(player1Index).position, front_default: '', types: [] };
    if(player1Data!=null){
        player1.front_default = player1Data.sprites.front_default;
        player1.types = player1Data.types;
    }
    let player2 = {name: name2, position: ranking.at(player2Index).position, front_default: '', types: []};
    if(player2Data!=null){
        player2.front_default = player2Data.sprites.front_default;
        player2.types = player2Data.types;
    }

    function getMatchResult() {
        let winner = player1;
        let loser = player2;
        winner.index = player1Index;
        loser.index = player2Index;
        if(Math.random()*1 > 0.5){
            winner = player2;
            loser = player1;
            winner.index = player2Index;
            loser.index = player1Index;
        }
        const selectedName = getSelectedName();
        const selectedWins = winner.index === ranking.findIndex(x => x.selected === true) && winner.name === selectedName;
        //Se actualiza el ranking: el perdedor con posicion del challenger y el ganador la anterior
        let newRanking = [];
        let newItem;
        ranking.forEach((item, index) => { newItem = item;
            if(index === winner.index) { newItem = { name: item.name, position: challengerPosition-1, selected: item.selected } }
            if(index === loser.index) { newItem = { name: item.name, position: challengerPosition, selected: item.selected } }
            newRanking.push(newItem);
        });
        newRanking.sort(((a, b) => a.position - b.position));
        dispatch( addRankingElements(newRanking) );
        const cols = [ 
            { field: 'set', headerName: 'Set', width: 70 },
            { field: 'winner', headerName: winner.name, width: 130 },
            { field: 'loser', headerName: loser.name, width: 130 }
        ];
        const rows = [
            { id: 1, set: 'Set 1', winner: 6, loser: Math.ceil(Math.random()*5) },
            { id: 2, set: 'Set 2', winner: 6, loser: Math.ceil(Math.random()*5) },
            { id: 3, set: 'Set 3', winner: 6, loser: Math.ceil(Math.random()*5) }
        ];
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