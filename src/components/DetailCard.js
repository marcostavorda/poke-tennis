import { useParams, useLocation } from "react-router-dom";

const DetailCard = () => {

    const location = useLocation();
    const data = location.state;

    return (<div className="App">
    <h3>{data.name}</h3> 
    <figure>
        <img src={data.sprites.front_default} alt={'front_default'} />
        <img src={data.sprites.back_default} alt={'back_default'} />
    </figure>
    {data.types.length > 0 ? <><h4>Tipo</h4><p>{data.types.map((itemType) => ( <>{itemType.type.name}<br/></>  ))} </p></> : ''}
    {data.types.length > 0 ? <><h4>Habilidades</h4><p>{data.abilities.map((itemAbility) => ( <>{itemAbility.ability.name}<br/></>  ))} </p></> : ''}
    {data.types.length > 0 ? <><h4>Movimientos</h4><p>{data.moves.map((itemMove) => ( <>{itemMove.move.name}<br/></> ))} </p></> : ''}
    </div>);
}

export default DetailCard;