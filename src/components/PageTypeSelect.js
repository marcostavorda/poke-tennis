import { MenuItem, Select, InputLabel } from "@mui/material";

export default function PageTypeSelect({selectedType, setSelectedType, changeUrl, getUrl, graphQLUrl}) {
    
    function changeSelected(event){
        setSelectedType(event.target.value);
        let url = getUrl;
        if(event.target.value==='graphQL'){
            url = graphQLUrl;
        }
        changeUrl(url);
    } 

    return(<>
        <InputLabel id="select-type-label">Listado</InputLabel>
        <Select
            labelId="select-type-label"
            id="type-select"
            value={selectedType}
            label="Resultados"
            onChange={changeSelected}
            >
            <MenuItem value={'get'}>Paginado</MenuItem>
            <MenuItem value={'graphQL'}>Todo</MenuItem>
        </Select>
    </>);
}