// Importa as dependências do projeto
const rest = require('restler');
const express = require('express');
const api = express();

// Define a porta através da variável de ambiente para o uso no Heroku OU utiliza a porta 3001
const porta = process.env.PORT || 3001;

// Endereço principal da API do GitHUb para o usuário da Take
const mainAddr = 'https://api.github.com/users/takenet'

// Endereço secundário de pesquisa dos repositórios em que a Take é o dono, ordenados por data de criação, de forma crescente
const searchAddr = '/repos?type=owner&sort=created&direction=asc';

// Rota para uma requisição GET no endereço /takenet/Csharp
api.get('/takenet/CSharp/', (req, res) => {

    // Realiza uma requisição GET na API do GitHub
    rest.get(`${mainAddr}${searchAddr}`).on('complete', function(result) {
        
        // Dicionário dos repositórios que passaram pelas condições de pesquisa
        var repositorios = {};
        var index = 1;

        // Verifica se o retorno da requisição e tenta novamente caso dê erro
        if (result instanceof Error) {
            console.log('Erro: ', result.message);
            this.retry(5000);
        }
        else {
            for (var repoIndex in result) { // Loop para cada repositório
                
                // Condição para verificar se o repositório é da linguagem C#
                if (result[repoIndex].language === 'C#' ) {

                    // Adiciona no dicionário as informações necessárias do repositório
                    repositorios["Repo" + index] = {
                        "titulo" : result[repoIndex].full_name,
                        "subtitulo" : result[repoIndex].description,
                        "avatar" : result[repoIndex].owner.avatar_url,
                    };

                    index++;
                }             

            }
        }

        // Define o tipo de resposta para o formato JSON e envia o dicionário
        res.type('application/json');
        res.json(repositorios);
    });
});

// Habilita a API para ficar esperando por uma requisição
api.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`)
    console.log('Para desligar o servidor: ctrl + c')
});