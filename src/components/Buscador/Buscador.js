import React, { useState } from "react";
import InputMask from "react-input-mask";
import "./buscador.css";
import axios from "axios";

export default function Buscador({ onAddPesquisaCep }) {
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const handleCepChange = (event) => {
    const formatedCep = event.target.value.replace(/\D/g, "");
    setCep(formatedCep);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        setRua(response.data.logradouro);
        setBairro(response.data.bairro);
        setCidade(response.data.localidade);
        setEstado(response.data.uf);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="buscador">
      <form onSubmit={handleSubmit}>
        <div className="title">INFORME UM CEP</div>
        <div>
          <InputMask
            className="input-text"
            mask="99.999-999"
            onChange={handleCepChange}
          />
        </div>
        <button type="submit" className="btn">
          Pesquisar
        </button>
      </form>
      <div className="result">
        <div className="table-row">
          <span className="column table_title">Logradouro:</span>
          <span className="column content">{rua}</span>
        </div>
        <div className="table-row">
          <span className="column table_title">Bairro:</span>
          <span className="column content">{bairro}</span>
        </div>
        <div className="table-row">
          <span className="column table_title">Cidade:</span>
          <span className="column content">{cidade}</span>
        </div>
        <div className="table-row">
          <span className="column table_title">Estado:</span>
          <span className="column content">{estado}</span>
        </div>
      </div>
    </div>
  );
}
