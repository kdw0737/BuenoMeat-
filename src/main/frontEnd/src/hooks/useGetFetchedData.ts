import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, RawAxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

const useGetFetchedData = (axiosParams: RawAxiosRequestConfig) => {
    const [response, setResponse] = useState<AxiosResponse>();
    const [error, setError] = useState<AxiosError>();
    const [loading, setLoading] = useState(true);

    const fetchData = async (params: AxiosRequestConfig) => {
        await axios.request(params)
                .then(response => {
                    setResponse(response);
                })
                .catch(error => {
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
    };

    useEffect(() => {
        fetchData(axiosParams);
    }, []);

    return { response, error, loading };
}

export default useGetFetchedData;