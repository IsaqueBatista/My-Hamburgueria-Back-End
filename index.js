const { req, res, json } = require('express')
const express = require('express')
const uuid = require('uuid')
const cors = require('cors')

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());


const listaPedidos = [];



const checkRequestId = (req, res, next) => {
    const { id } = req.params;

    const index = listaPedidos.findIndex(user => user.id === id);

    if (index < 0) {
        return res.status(404).json({ error: "User not found" });
    }

    req.userIndex = index;
    req.userId = id;

    next();
};


app.get('/pedidos', (req, res) => {
    return res.json(listaPedidos);
});

app.post('/pedidos', (req, res) => {
    const { name, pedido } = req.body;
    const request = { name, pedido, id: uuid.v4() };

    listaPedidos.push(request)
    return res.status(201).json(request);
})

app.put('/pedidos/:id', checkRequestId, (req, res) => {
    const { name, pedido } = req.body;
    const index = req.userIndex;
    const id = req.userId;

    const updatedPedido = { name, pedido, id };

    listaPedidos[index] = updatedPedido;

    return res.json(updatedPedido);
})

app.delete('/pedidos/:id', checkRequestId, (req, res) => {
    const index = req.userIndex

    listaPedidos.splice(index, 1)

    return res.status(204).json();
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

















