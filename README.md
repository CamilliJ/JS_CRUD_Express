# CRUD em Express

Projeto desenvolvido nas Aulas de Framework, para aprender sobre o uso de Express, APIS e Métodos HTTP e CRUD de Informações.
<br>
Esse projeto roda em um servidor em Express, ou seja, você roda ele em seu localhost iniciando o servidor. Para rodar esse projeto, siga os passos.<br>
 - Primeiro você deverá baixar o zip ou clonar o projeto para sua máquina, e abri-lo em seu VSCode ou editor de preferência. <br>
 - Você precisará instalar o Node em sua máquina, caso não tenha. <br>
 - Depois abra a sua pasta no seu Terminal ou abra o terminal do VScode e execute os seguintes códigos. <br>
  
```

npm init
npm install express
npm install nodemon
npm install http erros
npm install ejs
     
```
  
 - Assim o seu computador já está preparado para receber os códigos.<br>
 - Agora para rodar o seu servidor, você tem duas opções:<br>
    - Abrir o seu Terminal ou abra o terminal do windows e execute o código: <b> npm run iniciar </b>. Abrir um navegador (de preferência o Chrome), e digitar: localhost:3000. Assim o seu projeto ja estará rodadando.
    - Baixar o Insomina, assim você terá todas as requisições necessárias para acessar o projeto.
    
<hr> 

### ENDPOINTS PARA TESTE
 - Endpoint para retornar todos os dados do arquivo JSON (método GET):
 
 ```
localhost:3000/alunos    
```

 - Endpoint para retornar aluno específico (método GET):
 
 
 ```
localhost:3001/alunos/{id-desejado} 
``` 

 - Endpoint para consultar a nota total de um aluno em uma matéria junto com parametros de exemplo (método POST):
 
 ```
localhost:3000/alunos/notaTotal
{
"student": "Loiane Groner",
"subject": "01 - JavaScript"
}
``` 

 - Endpoint para consultar media de aluno em uma disciplina recebendo o nome do aluno e da matéria de parametros (POST):
 
```
localhost:1/alunos/media
{
"student": "Loiane Groner",
"subject": "01 - JavaScript"
}
``` 

 - Endpoint para criar novo registro. Aluno, matéria, atividade e nota são obrigatórios (POST):
 
```
localhost:1/alunos/add
{
"student": "NOME",
"subject": "MATERIA",
"type": "ATIVIDADE",
"value": 10
}
``` 

 - Endpoint para atualizar registro. ID, aluno, matéria, atividade e nota são obrigatórios (PUT):
 
```
localhost:1/alunos/
{
"id": 1
"student": "NOME",
"subject": "MATERIA",
"type": "ATIVIDADE",
"value": 10
}
``` 

Endpoint para excluir registro. ID é obrigatórios (DELETE):

```
localhost:1/alunos/{id-do-registro}
{
"id": 1
}
``` 

- Endpoint para consultar tres maiores notas em uma matéria. Matéria é obrigatória (POST):

```
localhost:1/alunos/topTres
{
"subject": "01 - JavaScript"
}
```
