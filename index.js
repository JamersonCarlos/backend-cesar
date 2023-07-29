const express = require('express');
const app = express();
const conection = require('./db/conn');
const Light = require('./models/light');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/getall', async  (req, res) => { 
    const lights = await Light.findAll({raw: true});
    const responseObject = { 
        message: 'Todas as lampadas cadastradas', 
        data: Object.values(lights).length === 0 ? [] : lights
    }
    res.setHeader('Content-type', 'application/json');
    const jsonResponse = JSON.stringify(responseObject);
    res.end(jsonResponse);
});

app.get('/getone/:id', async (req, res) => { 
    const id = req.params.id 
    const light = await Light.findOne({where: {id: id}});
    const responseObject = { 
        message: light != null ? 'lampada encontrada!' : 'lampada não encontrada',
        data: light != null ? light : {} 
    }
    res.setHeader('Content-type', 'application/json');
    const jsonResponse = JSON.stringify(responseObject);
    res.end(jsonResponse);
})

app.post('/newlight', (req, res) => { 
    Light.create(req.body).then(
        res.json({message: 'Lampada adicionada com sucesso'})
    ).catch((err) => console.log(err));
}); 

app.put('/updatelight/:id', (req, res) => { 
    const id = req.params.id;
    const intensity = req.body.intensity; 
    const status = req.body.status; 
    Light.update({intensity: intensity, status: status}, {where: {id: id}}).then(
        res.json({message: 'lampada atualizada com sucesso'})
    ).catch((err) => console.log(err))
});

conection.sync().then(
    app.listen(3000, () => { 
        console.log('api rodando');
    })
).catch((err) => console.log(err));
