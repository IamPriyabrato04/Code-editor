import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = ({ url, method, body = null, headers = {}, executeOnMount = true }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(executeOnMount);

    const fetchData = async (overrideBody = null) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios({
                url,
                method,
                data: overrideBody || body,
                headers,
            });
            setData(response.data);
        } catch (err) {
            setError(err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (executeOnMount) fetchData();
    }, []);

    return { data, error, loading, refetch: fetchData };
};

export default useFetch;