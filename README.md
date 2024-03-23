## App - Aplicação de Trainador pokemon

- 1º Para iniciar a aplicação baixe ou clone os arquivos em sua máquina.
- 2º Entre na pasta "Trainer-pokemon-aplication" e execute o comando "docker compose up -d --build" para executar a aplicação BackEnd e o Banco de Dados e espere terminar de executar.
- 3ª Entre na pasta "pokemon-trainer-front" e execute o mesmo comando "docker compose up -d --build" para executar a aplicação FrontEnd e espere terminar de executar.
- 4º Após a execução dos comandos entre em um navegador e digite "http://localhost:5173".

## Desafios

- [x] Criar um sistema onde treinadores possam entrar se cadastrando com o seu nome de treinador e senha.
- [x] Criar um time de pokémons com 5 pokémons (o total de pokémons no time é 5);
- [x] Listar todos os pokémons da API;
- [x] Filtrar tanto por nome quanto por tipo ou ambos, se eu não achar o pokémons pesquisando pelo nome quero que seja informado que o pokémon que eu procurei não existe na pokedéx;
- [x] Seja possível visualizar as evoluções dos pokémons.
- [x] O sistema deve ser desenvolvido com Docker e Docker compose onde, ao final do processo seja gerado um arquivo do Docker compose com todos os serviços necessários para rodar o sistema: (Backend, frontend, banco de dados etc...)
- [x] Para o desenvolvimento do Backend utilize Typescript com Nodejs, para o desenvolvimento do Frontend utilize Typescript com React usando o framework (Vite) e para o banco de dados se necessário o Postgres. A utilização do Docker com Docker compose é obrigatória.
