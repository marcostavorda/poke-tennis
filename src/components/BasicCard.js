
const BasicCard = ({position, data}) => {

    return(<>
        <h3>{position} {data.name}</h3>
        <figure>
            <img src={data.sprites.front_default} alt={data.name} />
        </figure>
    </>);
}

export default BasicCard;