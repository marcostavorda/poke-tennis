export default function createRanking(listedItems, selectedPokemon) {
    let position = 0;
    let ranking = [];
    let names = [];
    while (ranking.length < 10 || ranking.length === listedItems.length){
        var value = listedItems.at(Math.random()*listedItems.length);
        //Se comenta validacion ya que a veces quede en loop al obtener valores previamente agregados
        /*if(names.indexOf(value.name)===-1 && names.indexOf(selectedPokemon)===-1){*/
            names.push(value.name);
            ranking.push({name: value.name, position: ++position, selected: false});
        //}
    }
    ranking.push({name: selectedPokemon, position: ++position, selected: true});
    return ranking;
}