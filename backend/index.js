import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"loja"
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("Hello this is the backend")
})

app.get("/filiais", (req,res)=>{
    const q = "SELECT * FROM filiais"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/filiais", (req,res)=>{
    const q = "INSERT INTO filiais(`codigo`,`nome`,`cnpj`,`endereco`,`cidade`,`estado`,`telefone`,`email`,`instagram`,`facebook`,`numeroveiculospatio`) VALUES (?)";
    const values = [
        req.body.codigo,
        req.body.nome,
        req.body.cnpj,
        req.body.endereco,
        req.body.cidade,
        req.body.estado,
        req.body.telefone,
        req.body.email,
        req.body.instagram,
        req.body.facebook,
        req.body.numeroveiculospatio,
    ];

    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Filial has been created successfully")
    })
})

app.delete("/filiais/:id", (req,res)=>{
    const filialId = req.params.id;
    const q = "DELETE FROM filiais WHERE idfilial = ?"

    db.query(q, [filialId], (err,data)=>{
        if (err) return res.json(err);
        return res.json("Filial has been deleted successfully");
    })
})

app.put("/filiais/:id", (req, res) => {
    const filialId = req.params.id;
    const q = "UPDATE filiais SET `codigo` = ?, `nome` = ?, `cnpj` = ?, `endereco` = ?, `cidade` = ?, `estado` = ?, `telefone` = ?, `email` = ?, `instagram` = ?, `facebook` = ?, `numeroveiculospatio` = ? WHERE idfilial = ?";

    const values = [
        req.body.codigo,
        req.body.nome,
        req.body.cnpj,
        req.body.endereco,
        req.body.cidade,
        req.body.estado,
        req.body.telefone,
        req.body.email,
        req.body.instagram,
        req.body.facebook,
        req.body.numeroveiculospatio,
    ];

    db.query(q, [...values,filialId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Filial has been updated successfully");
    })
});

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})