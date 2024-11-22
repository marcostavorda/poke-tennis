import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addSelectedPokemon } from "../slices/selectionSlice.js";

function SelectButton({name}) {

    const dispatch = useDispatch();

    function selectPokemon() {
        dispatch(addSelectedPokemon(name));
    }

    return (
        <Button variant="outlined" onClick={selectPokemon}>
            Seleccionar
        </Button>
    );
}
export default SelectButton;