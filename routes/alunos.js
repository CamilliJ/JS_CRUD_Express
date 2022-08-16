import express from "express";
import { promises as fs } from "fs";
import cors from "cors";

const { readFile, writeFile } = fs;

const router = express.Router();


// Endpoit para cadastrar um Aluno 
router.post("/", async (req, res, next) => {
    try {
        let aluno = req.body;
        var dataAtual = new Date();
        var dia = dataAtual.getDate();
        var mes = (dataAtual.getMonth() + 1);
        var ano = dataAtual.getFullYear();
        var horas = dataAtual.getHours();
        var minutos = dataAtual.getMinutes();
        if (!aluno.student || !aluno.subject || !aluno.type || !aluno.value) {
            throw new Error("Name, Materia, Atividade e Valor são obrigatórios.");
        }


        const data = JSON.parse(await readFile(global.fileName));

        aluno = {
            id: data.nextId++,
            student: aluno.student ,
            subject: aluno.subject,
            type: aluno.type,
            value: aluno.value,
            timestamp:  + dia + "/" + mes + "/" + ano + " - " + horas + ":" + minutos + "h."
        };

        console.log(aluno)

        data.alunos.push(aluno);

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(aluno);

        logger.info(`POST /alunos - ${JSON.stringify(aluno)}`);
    } catch (err) {
        next(err);
    }
});

// Endpoit para retornar todos os Alunos
router.get("/", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        delete data.nextId;
        res.send(data);
        logger.info("GET /alunos");
    } catch (err) {
        next(err);
    }
});

// Endpoit para retornar um Aluno específico por ID
router.get("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const aluno = data.alunos.find(
            aluno => aluno.id === parseInt(req.params.id));
        res.send(aluno);
        logger.info("GET /alunos/:id")
    } catch (err) {
        next(err);
    }
});

// Endpoint para consultar a media de um aluno em uma matéria
router.post("/media", async(req,res,next) =>{
    try {
        let aluno = req.body;

        if(!aluno.student || !aluno.subject){
            throw new Error("Aluno e matéria são obrigatórios!");
        }

        const data = JSON.parse(await readFile(global.fileName)) 
        var filtroAluno = data.alunos.filter( data => data.student == aluno.student)  
        var filtroMateria = filtroAluno.filter(data => data.subject == aluno.subject) 

        var notaTotal = 0; 
        var media = 0;
        
        for(var i = 0; i < filtroMateria.length; i++){ 
            notaTotal += filtroMateria[i].value
        }
        media = notaTotal / filtroMateria.length; 

        res.send(media.toString()) 
        console.log("POST /media: " + media + " => consultando média de aluno em uma matéria")
    } catch (error) {
        next(error)
    }
})

// Endpoint para consultar a nota total de um aluno em uma matéria
router.post("/notatotal", async(req, res, next) => { 
    try{
        console.log("oi")
        let aluno = req.body 

        if(!aluno.student || !aluno.subject){ 
            throw new Error("Aluno e matéria são obrigatórios!");
        }

        const data = JSON.parse(await readFile(global.fileName)) 
        var filtroAluno = data.alunos.filter( data => data.student == aluno.student) 
        var filtroMateria = filtroAluno.filter(data => data.subject == aluno.subject) 
        var notaTotal = 0; 

        for(var i = 0; i < filtroMateria.length; i++){ 
            notaTotal += filtroMateria[i].value
        }

        res.send(notaTotal.toString()) // Enviando os dados de resposta
        console.log("POST /notaTotal: " + notaTotal + " => consultando nota total de aluno em uma matéria")
    }catch(err){
        next(err)
    }
})

// Endpoit para deletar um Aluno específico por ID
router.delete("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));    
        data.alunos = data.alunos.filter(
            aluno => aluno.id !== parseInt(req.params.id));        
        await writeFile(global.fileName, JSON.stringify(data, null, 2));        
        res.end();
        logger.info(`DELETE /alunos/:id - ${req.params.id}`)
    } catch (err) {
        next(err);  
    }
});


// Endpoit para atualizar os dados de um Aluno específico
router.put("/", async (req, res, next) => {
    try {
        const aluno = req.body;

        if (!aluno.student || !aluno.subject || !aluno.type || !aluno.value) {
            throw new Error("Name, Materia, Atividade e Valor são obrigatórios.");
        }

        const data = JSON.parse(await readFile(global.fileName));
        const index = data.alunos.findIndex(a => a.id === aluno.id);

        if (index === -1) {
            throw new Error("Registro não encontrado.");
        }

        data.alunos[index].student = aluno.student;
        data.alunos[index].subject = aluno.subject;
        data.alunos[index].type = aluno.type;
        data.alunos[index].value = aluno.value;

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(aluno);

        logger.info(`PUT /alunos - ${JSON.stringify(aluno)}`);
    } catch (err) {
        next(err);               
    }
});


router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);    
    res.status(400).send({ error: err.message });    
});

export default router;