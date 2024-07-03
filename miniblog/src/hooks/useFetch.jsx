import React from "react";
import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  const [loading, setLoading] = useState(false);

  const [messageAlert, setMessageAlert] = useState(null);

  const [itemId, setItemId] = useState(null);

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method,
        Headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else if (method === "DELETE") {
      setConfig({
        method,
        Headers: {
          "Content-Type": "application/json",
        },
      });
      setItemId(data);
    }
    setMethod(method);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (error) {
        setMessageAlert("Houve algum erro ao carregar os dados!");
      }

      setLoading(false);
    };
    fetchData();
  }, [url, callFetch]);

  //refatorando post
  useEffect(() => {
    const httpRequest = async () => {
      let json;

      if (method === "POST") {
        let fetchOptions = [url, config];
        const res = await fetch(...fetchOptions);
        json = await res.json();
        setMessageAlert("Cadastro realizado com sucesso!");
      } else if (method === "DELETE") {
        const deleteUrl = `${url}/${itemId}`;
        const res = await fetch(deleteUrl, config);
        json = await res.json();
        setMessageAlert("Produto removido com sucesso!");
      }
      setCallFetch(json);
    };
    httpRequest();
  }, [config, method, url]);

  return { data, httpConfig, loading, messageAlert };
};
