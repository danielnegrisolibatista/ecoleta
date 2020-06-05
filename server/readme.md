
# Projeto Ecoleta

## Iniciando o projeto

### Projeto Server

- Criar a pasta server
- Iniciar um projeto node com `npm init -y`
- Instalar o express `npm install express`
- Criar a pasta src
- Criar o arquivo src/server.ts
- Instalar a dependencia de tipagem apenas para desenvolvimento `npm install @types/express -D`
- Instalar a typescript apenas para desenvolvimento  `npm install typescript - D`
- Instalar a dependencia de node para typescript apenas para desenvolvimento `npm install ts-node -D`
- Inicializar o projeto typescript `npx tsc --init`
- Usar `npx ts-node src/server.ts` para executar o arquivo
- Instalar o livereload de código `npm install ts-node-dev - D`
- Alterar o package.json inserindo o script dev `ts-node src/server.ts`
- Usar `npm run dev` para executar a aplicação

### Rota básica no Projeto Server (Backend)

```javascript
// server.js
import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  console.log('Listagem de usuarios');

  // response.send('Hello world')

  response.json([
    'João',
    'Maria',
    'José'
  ]);
});

app.listen(3333);
```

### Novas rota testes no Projeto Server (Backend)

```javascript
// server.ts
import express from 'express';

const app = express();

app.use(express.json());

const users = [
  'Daniel', 
  'Monique'
]

app.get('/users', (request, response) => {
  // query param: parametros que vem na própria rota geralmente opcionais para filtros, paginação
  const search = String(request.query.search);

  const filteredUsers = users.filter(user => user.includes(search));

  response.json(filteredUsers);
});

app.get('/users/:id', (request, response) => {
  // request param: parametros que vem na própria rota que identificam um recurso
  const id = Number(request.params.id);

  const user = users[id];

  response.json(user);
});

app.post('/users', (request, response) => {
  // request body: parametros para criação/atualização de informações
  const data = request.body;

  const user = {
    name: data.name,
    email: data.email
  };

  return response.json(user);
});

app.listen(3333);
```

### Projeto Web (Frontend)

- Criar o projeto react com `npx create-react-app web --template-typescript`
- Usar `npm start` para executar a aplicação

### Refatorando o Projeto Server (Backend)

- Retirar o código extra do server.ts e deixar o básico

```javascript
// server.ts
import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);
```

- Criar o arquivo src/routes.ts

```javascript
// routes.ts
import express from 'express';

const routes = express.Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

export default routes;
```

- Criar a pasta src/database
- Instalar a dependencia knex `npm install knex`
- Criar o arquivo src/database/connection.ts
- Instalar o pacote do sqlLite `npm install sqlite3`
- Criar o conteúdo do arquivo connection.ts

```javascript
// connection.ts
import knex from 'knex';
import path from 'path';

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite')
  }
});

export default connection;
```

- Criar o arquivo knexfile.ts na raiz do projeto para configurar o knex

```javascript
// knexfile.ts
import path from 'path';

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  }
}
```

- Criar a pasta database/migrations
- Criar os arquivos 00_create_points.ts, 01_create_items.ts, 02_create_point_items.ts dentro da pasta migrations

```javascript
// 00_create_points.ts
import Knex from 'knex'; // tipo knex

export async function up(knex: Knex) {
  return knex.schema.createTable('points', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whataspp').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('logintude').notNullable();
    table.string('uf', 2).notNullable();
    table.string('city').notNullable();
  });
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('point');
}


// 01_create_items.ts
import Knex from 'knex'; // tipo knex

export async function up(knex: Knex) {
  return knex.schema.createTable('items', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
  });
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('items');
}


// 02_create_point_items.ts
import Knex from 'knex'; // tipo knex

export async function up(knex: Knex) {
  return knex.schema.createTable('point_items', table => {
    table.increments('id').primary();

    table.integer('point_id')
      .notNullable()
      .references('id')
      .inTable('points');

    table.integer('item_id')
      .notNullable()
      .references('id')
      .inTable('items');
  });
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('point_items');
}
```

- Usar o `npx knex --knexfile knexfile.ts migrate:latest` para executar as migrations
- Instalar a extensão `SQLite` para visualizar o banco de dados
- Alterar o arquivo package.json e inserir o script `"knex:migrate": "npx knex --knexfile knexfile.ts migrate:latest"`
- Usar o `npm run knex:migrate` para rodar as migrations quando necessário
- Criar a pasta database/seeds para criar registros padrões no banco de dados
- Criar o arquivo database/seeds/create_items.ts

```javascript
// create_items.ts

import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Lâmpadas', image: 'lampadas.svg' },
    { title: 'Pilhas e baterias', image: 'baterias.svg' },
    { title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
    { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
    { title: 'Resíduos Orgânicos', image: 'organicos.svg' },
    { title: 'Óleo de Cozinha', image: 'oleo.svg' },
  ]);
}
```

- Alterar o arquivo knexfile.ts para conter o caminhos até a pasta seeds

```javascript
// knexfile.ts

import path from 'path';

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds')
  },
  useNullAsDefault: true
}
```

- Alterar o arquivo package.json e inserir o script `"knex:seed": "knex --knexfile knexfile.ts seed:run"`
- Usar `npm run knex:seed` para executar
- Criar a pasta uploads na raiz do projeto e inserir as imagens
- Alterar o arquivo server.ts para adicionar a rota para as imagens

```javascript
// server.ts
import express from 'express';
import routes from './routes';
import path from 'path';

const app = express();

app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);
```

- Alterar o arquivo routes.ts para adicionar as rotas

```javascript
// routes.ts

import express, { response } from 'express';
import knex from './database/connections';

const routes = express.Router();

routes.get('/items', async (request, response) => {
  const items = await knex('items').select('*');

  const serializedItems = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`
    }
  });

  return response.json(serializedItems);
});

routes.post('/points', async (request, response) => {
  const { // desestruturação
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    uf,
    city,
    items
  } = request.body

  const trx = await knex.transaction(); // habilita operação de transação no knex

  const insertIds = await trx('points').insert({
    image: 'image-fake',
    name, // shortname
    email,
    whatsapp,
    latitude,
    longitude,
    uf,
    city
  });

  const point_id = insertIds[0]

  const pointItems = items.map((item_id: number) => {
    return {
      item_id,
      point_id
    }
  })

  await trx('point_items').insert(pointItems);

  return response.json({ success: true });
});

export default routes;

```

- Criar a pasta controllers
- Criar os arquivos controllers/ItemsController.ts, controllers/PointsController.ts

```javascript
// PointsControllers.ts

import { Request, Response } from 'express';
import knex from '../database/connections';

// // index, show, create, upadt, delete
class PointsControllers {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parserItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parserItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    response.status(200).json(points);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json( { message: 'Point not found'});
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title')

    return response.status(200).json(
      {
        point,
        items
      }
    );
  }

  async create(request: Request, response: Response) {
    const { // desestruturação
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      uf,
      city,
      items
    } = request.body
  
    const trx = await knex.transaction(); // habilita operação de transação no knex
  
    const point = {
      image: 'image-fake',
      name, // shortname
      email,
      whatsapp,
      latitude,
      longitude,
      uf,
      city
    };

    const insertIds = await trx('points').insert(point);
  
    const point_id = insertIds[0]
  
    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id
      }
    })
  
    await trx('point_items').insert(pointItems);

    await trx.commit();

    return response.json({
      id: point_id,
      ...point
    });

  }
}

export default PointsControllers;
```

```javascript
// ItemsController.ts

import knex from '../database/connections';
import { Request, Response } from 'express';

// index, show, create, upadt, delete
class ItemsController {
  async index (request: Request, response: Response) {
    const items = await knex('items').select('*');
  
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`
      }
    });
  
    return response.json(serializedItems);
  }
}

export default ItemsController;
```

- Alterar o arquivo routes.ts

```javascript
// routes.ts

import express, { response } from 'express';

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);


export default routes;
```

- Instalar o CORS na aplicação `npm install cors`
- Instalar a dependencia de tipagem apenas para desenvolvimento `npm install @types/cors -D`
- Alterar o arquivo server.ts para adicionar o CORS

```javascript
// server.ts

import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);
```