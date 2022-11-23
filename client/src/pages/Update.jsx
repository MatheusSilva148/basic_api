import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextInput, Title, Button } from '@mantine/core';

const Update = () => {

    const [filial, setFilial] = useState(
      {
        codigo: "",
        nome: "",
        cnpj: "",
        endereco: "",
        cidade: "",
        estado: "",
        telefone: null,
        email: "",
        instagram: "",
        facebook: "",
        numeroveiculospatio: null,
    }
    );

    const navigate = useNavigate()
    const location = useLocation()

    const filialId = location.pathname.split("/")[2]

    const handleChange = (e) =>{
        setFilial((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

   const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.put("http://localhost:8800/filiais/" + filialId, filial)
            navigate("/")
        } catch(err){
            console.log(err)
        }
   }

    return (
        <>
            <div className='form'>
                <Title order={1}>Atualizar Filial</Title>
                <TextInput placeholder='Código' onChange={handleChange} name="codigo"/>
                <TextInput placeholder='Nome' onChange={handleChange} name="nome"/>
                <TextInput placeholder='CNPJ' onChange={handleChange} name="cnpj"/>
                <TextInput placeholder='Endereço' onChange={handleChange} name="endereco"/>
                <TextInput placeholder='Cidade' onChange={handleChange} name="cidade"/>
                <TextInput placeholder='Estado' onChange={handleChange} name="estado"/>
                <TextInput placeholder='Telefone' onChange={handleChange} name="telefone"/>
                <TextInput placeholder='E-mail' onChange={handleChange} name="email"/>
                <TextInput placeholder='Instagram' onChange={handleChange} name="instagram"/>
                <TextInput placeholder='Facebook' onChange={handleChange} name="facebook"/>
                <TextInput min="0" placeholder='Nº de veículos no pátio' onChange={handleChange} name="numeroveiculospatio"/>
                <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} onClick={handleClick}>Atualizar</Button>
            </div>
        </>
    )
}

export default Update;