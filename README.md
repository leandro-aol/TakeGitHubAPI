# TakeGitHubAPI
API intermediária para consumir dados da API do GitHub

## Vamos lá!
1) Faça o download e instale o [Node.js](https://nodejs.org/en/download/) corresponde à sua plataforma.

2) Crie e entre na pasta do projeto
    * npm init

3) Instalar o [Restler](https://github.com/danwrong/restler) e o [Express](https://expressjs.com/pt-br/)
    * npm i restler --save
    * npm - express --save

        _--save irá salvar a dependência no seu arquivo `package.json`_

4) Instale também o Nodemon.    
    * npm i -g nodemon

        _-g significa que o nodemon será instalado de forma global_

        Ele falicita bastante para não ter que parar e executar novamente o servidor a cada save.

## Pequenos lembretes!

Para executar o servidor
* nodemon api

Para instalar as dependências do arquivo `package.json`
* npm install 

Heroku
* heroku login
* heroku create
* git push heroku master