const rest = require('restler');

const express = require('express');
const api = express();

const mainAddr = 'https://api.github.com/users/takenet'
const searchAddr = '/repos?type=owner&sort=created&direction=asc';

var porta = process.env.PORT || 3001;
var repositorios = {};
// var repositorios = new Array();

api.get('/takenet/CSharp/', (req, res) => {
    rest.get(`${mainAddr}${searchAddr}`).on('complete', function(result) {
        if (result instanceof Error) {
            console.log('Erro: ', result.message);
            this.retry(5000);   // Tenta novamente em 5 segundos
        }
        else {
            // index = 65;
            index = 0;
            for (var repoIndex in result) { // Loop para cada repositório
                
                if (result[repoIndex].language === 'C#' ) {

                    // repositorios.push({ "titulo" : result[repoIndex].full_name, "subtitulo" : result[repoIndex].description, "avatar" : result[repoIndex].owner.avatar_url })
                    
                    // repositorios[String.fromCharCode(index)] = {
                    repositorios["Repo" + index] = {
                        "titulo" : result[repoIndex].full_name,
                        "subtitulo" : result[repoIndex].description,
                        "avatar" : result[repoIndex].owner.avatar_url,
                    };

                    
                    // repositorios["titulo" + index] = result[repoIndex].full_name;
                    // repositorios["subtitulo" + index] = result[repoIndex].description;
                    // repositorios["avatar" + index] = result[repoIndex].owner.avatar_url;

                    index += 1;
                }                

            }
        }

        // res.send(repositorios);
        res.type('application/json');
        res.send(JSON.stringify(repositorios));
        // res.json(repositorios.slice(0,5));
    });
});

api.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`)
    console.log('Para desligar o servidor: ctrl + c')
});