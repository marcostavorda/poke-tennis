import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ItemCard from "./ItemCard";


const Ranking = () => {

    const location = useLocation();
    const state = location.state;
    const [data, setData] = useState();

    useEffect(() => {
        let ranking = [];
        if(state.length > 10){
            while (ranking.length < 10){
                var value = state.at(Math.random()*state.length);
                if(ranking.indexOf(value)===-1){
                    ranking.push(value);
                }
            }
        }
        else{
            ranking = state;
        }
        setData(ranking);
    }, []);

    return (<div className="App">
    <h2>Ranking Top 10</h2>
    <ul>
        {data!=null && data.length > 0 ? (data.map((itemRank, index) => (
            <ItemCard key={index} itemName={itemRank.name} url={itemRank.url} position={index+1} />)
            )) 
        : <>Cargando...</>}
    </ul>
    </div>);
}

export default Ranking;