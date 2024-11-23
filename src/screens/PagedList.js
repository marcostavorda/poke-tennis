import { useState } from "react";
import ItemCard from "../components/ItemCard";
import useData from "../hooks/useData";
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addRankingElements } from "../slices/rankingSlice";
import { useNavigate } from "react-router-dom";
import PageTypeSelect from "../components/PageTypeSelect";
import createRanking from "../utils/createRanking.js";

const PagedList = () => {

    const getUrl = 'https://pokeapi.co/api/v2/pokemon/';
    const graphQLUrl = 'https://beta.pokeapi.co/graphql/v1beta';
    const graphQLRequest = `query samplePokeAPIquery {
        results: pokemon_v2_pokemonspecies(
            where: {pokemon_v2_generation: {name: {}}}, order_by: {id: asc}) {
          name
          id
        }
      }`;

    const [url, setUrl] = useState(getUrl);

    const [selectedType, setSelectedType] = useState('get');

    const {data, error, loading} = useData(url, selectedType, graphQLRequest)
    
    let itemsList = data != null ? data : null; 

    const changeUrl = (newUrl) => {
        setUrl(newUrl);
    }
    
    const selectedPokemon = useSelector((state) => state.selected.value);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function addRanking () {
        const ranking = createRanking(itemsList.results, selectedPokemon);
        dispatch( addRankingElements(ranking) );
        navigate("/ranking");
    };

    const selectionInfo = selectedPokemon == null ? <h3>Seleccionar Pokemon</h3> : 
        <h3>Seleccionado {selectedPokemon} <Button variant="contained" onClick={() => addRanking()} >Iniciar</Button></h3>;

    if(loading){ return <p className="App"><CircularProgress /></p> }
    if(error!=null){
        return (<><h2>Error Paginando</h2>{error}</>);
    }
    return(<div className="App">
        {selectionInfo}
        <PageTypeSelect selectedType={selectedType} setSelectedType={setSelectedType} 
        changeUrl={changeUrl} getUrl={getUrl} graphQLUrl={graphQLUrl} />
        <br/>
        {itemsList?.previous!=null ? <Button variant="contained" onClick={() => changeUrl(itemsList.previous)} >Anterior</Button> : <></> }
        {itemsList?.next!=null ? <Button variant="contained" onClick={() => changeUrl(itemsList.next)}>Siguiente</Button> : <></> }
        {itemsList?.results.length > 0 ? <><br/>        
        <Grid container justify="center" spacing={2}>
            <Grid item xs={10}>
                <Grid container alignItems="flex-start" justify="center" spacing={1}>
                    { itemsList.results.map((itemList, index) => (
                        <ItemCard key={index} itemName={itemList.name} />
                        ) )}
                </Grid>
            </Grid>
        </Grid></>
        : <>No hay datos</>}
    </div>);
}

export default PagedList;