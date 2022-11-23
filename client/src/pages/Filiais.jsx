import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Card, Text, Title, Button } from '@mantine/core';

const Filiais = () => {
    const [filiais, setFiliais] = useState([])

    useEffect(()=>{
        const fetchAllFiliais = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/filiais")
                setFiliais(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllFiliais()
    }, []);

    const handleDelete = async (id)=>{
        try{
            await axios.delete("http://localhost:8800/filiais/"+id)
            window.location.reload()
        } catch(err){
            console.log(err)
        }

    }

    return (
        <>
            <Title order={1}>Filiais</Title>
            <div className='filiais'>
                {filiais.map(filial=>(
                    <Card shadow="sm" p="lg" radius="md" withBorder>
                        <div className="filial" key={filial.idfilial}>
                        
                            <Text weight={500}>
                                {filial.nome}
                            </Text>

                            <Text size="sm" color="dimmed">
                                <p>Código: {filial.codigo}</p>

                                <p>CNPJ: {filial.cnpj}</p>

                                <p>Endereço: {filial.endereco}</p>

                                <p>Cidade: {filial.cidade}</p>

                                <p>Estado: {filial.estado}</p>

                                <p>Telefone: {filial.telefone}</p>

                                <p>E-mail: {filial.email}</p>

                                <p>Instagram: {filial.instagram}</p>

                                <p>Facebook: {filial.facebook}</p>

                                <p>Nº de veículos no pátio: {filial.numeroveiculospatio}</p>
                            </Text>

                            <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                                <Link to={`/update/${filial.idfilial}`} className="link">Atualizar</Link>
                            </Button>
                            
                            <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }} onClick={()=>handleDelete(filial.idfilial)}>
                                Excluir
                            </Button>

                        </div>
                    </Card>
                ))}   
            </div>

            <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
                <Link to="/add" className='link'>Adicionar nova filial</Link>
            </Button>
        </>
    );
    
};

export default Filiais