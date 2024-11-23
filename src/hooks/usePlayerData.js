import useData from "./useData";

const usePlayerData = (url, initialData) => {
    let playerData = initialData;
    const { data, loading, error } = useData(url + initialData.name, 'get');

    const front_default = data?.sprites ? data.sprites.front_default : '';
    const types = data?.types ? data.types : [];
    playerData = {...playerData, front_default: front_default, types: types};
    return {playerData, loading}
}

export default usePlayerData;