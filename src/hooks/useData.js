import axios from "axios";
import { useState, useEffect } from "react";

const useData = (url, type, request) => {
    
    const[data, setData] = useState(null);
    const[error, setError] = useState(null);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        if(type==='get'){
            (async () => {
                try{
                    const response = await axios.get(url);
                    if(response.status===200){ setData(response.data); }
                    else{ setError('Error status ' + response.status + ': ' + response.error); }
                }
                catch(error){ setError('Error: ' + error) }
                finally{ setLoading(false); }
            })();
        }
        if(type==='graphQL'){
            (async () => {
                try{
                    const response = await axios.post(url, 
                        {query: request}, 
                        {headers: { 'Content-Type': 'application/json'} });
                    if(response.status===200){ setData(response.data.data); }
                    else{ setError('Error status ' + response.status + ': ' + response.error); }
                }
                catch(error){ setError('Error: ' + error) }
                finally{ setLoading(false); }
            })();
        }
        
    }, [url]);

    return { data, error, loading };
}

export default useData;