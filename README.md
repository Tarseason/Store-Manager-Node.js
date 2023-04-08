# Store Manager 👺
  Foi desenvolvido um sistema de gerenciamento de vendas no formato dropshipping em que é possivel criar, visualizar, deletar e atualizar produtos e vendas. Sendo utilizado o mySql para a gestão de dados sendo uma API RESTful
## Stacks:
**Back-end:** Node | Express | Docker | JavaScript | SQL | Mocha
## Endpoints:
- get `/products`
- get `/products/:id`
- post `/produts`
- post `/sales`
- get `/sales`
- get `/sales/:id`
- put `/products/:id`
- delete `/products/:id`
- delete `/sales/:id`
- post `/sales/:id`
## Instalação
Instale Store Manager no seu terminal:
```bash
  git clone git@github.com:Tarseason/Store-Manager-Node.js.git
  docker-compose up -d
  docker exec -it talker_manager bash
  npm install
  npm start ou npm run debug
```
