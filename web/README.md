# Projeto Ecoleta

## Projeto Web

### Iniciando o projeto

- Criar o projeto react com `npx create-react-app web --template typescript`
- Usar `npm start` para executar a aplicação

### Retirando arquivos do template padrão

- Apagar todos os arquivos da pasta public, deixar apenas o index.html
- Apagar os arquivos App.test.js, index.css, logo.svg, serviceWorker.js, setupTest.js da pasta src
- Alterar os arquivos App.css, App.tsx, index.tsx

```css
/* App.css */
/* nada mesmo */
```

```javascript
// App.tsx

import React from 'react';
import './App.css';

function App() {
  return (
    <h1>Hello World</h1>
  );
}

export default App;
```

```javascript
// index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

- Usar `npm start` para executar a aplicação
- Abrir as configurações do VSCode e adicionar as propriedades no emmet para habilitar o javascript em arquivos jsx e react

```json
// settings.json

"emmet.syntaxProfiles": { "javascript": "jsx" },
"emmet.includeLanguages": { "javascript": "javascriptreact"},
```

- Criar o component src/Header.tsx

```javascript
// Header.tsx
import React from 'react';

function Header() {
  return (
    <header>
      <h1>Ecoleta</h1>
    </header>
  );
}

export default Header;
```

- Inserir o componente no arquivo App.tsx

```javascript
// App.tsx

import React from 'react';
import './App.css';

import Header from './Header';

function App() {
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
```

- Instalar o react-icons `npm install react-icons`
- Crie a pasta pages e pages/Home
- Crie os arquivos Home/index.tsx e Home/style.css

```javascript
// Home/index.tsx

import React from 'react';

import './styles.css'

import logo from '../../assets/logo.svg';

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta"/>
        </header>

        <main>
          <h1>Seu marketplace de coleta de resíduos.</h1>
          <p>Ajudamos pessoas a econtrarem pontos de coleta de forma eficiente.</p>

          <a href="/cadastro">
            <span> > </span>
            <strong>Cadastre um ponto de coleta</strong>
          </a>
        </main>
      </div>
    </div>
  );
}

export default Home;
```

```css
/* Home/style.css */

#page-home {
  height: 100vh;

  background: url('../../assets/home-background.svg') no-repeat 600px bottom;
}

#page-home .content {
  width: 100%;
  height: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 30px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#page-home .content header {
  margin: 48px 0 0;
}

#page-home .content main {
  flex: 1;
  max-width: 560px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

#page-home .content main h1 {
  font-size: 54px;
  color: var(--title-color);
}

#page-home .content main p {
  font-size: 24px;
  margin-top: 24px;
  line-height: 38px;
}

#page-home .content main a {
  width: 100%;
  max-width: 360px;
  height: 72px;
  background: var(--primary-color);
  border-radius: 8px;
  text-decoration: none;

  display: flex;
  align-items: center;
  overflow: hidden;

  margin-top: 40px;
}

#page-home .content main a span {
  display: block;
  background: rgba(0, 0, 0, 0.08);
  width: 72px;
  height: 72px;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

#page-home .content main a span svg {
  color: #FFF;
  width: 20px;
  height: 20px;
}

#page-home .content main a strong {
  flex: 1;
  text-align: center;
  color: #FFF;
}

#page-home .content main a:hover {
  background: #2FB86E;
}

@media(max-width: 900px) {
  #page-home .content {
    align-items: center;
    text-align: center;
  }

  #page-home .content header {
    margin: 48px auto 0;
  }

  #page-home .content main {
    align-items: center;
  }

  #page-home .content main h1 {
    font-size: 42px;
  }

  #page-home .content main p {
    font-size: 24px;
  }
}
```

- Instalar o react-router-dom `npm install react-router-dom`
- Instalar o types/react-router-dom `npm install @types/react-router-dom -D`
- Crie a pasta pages e pages/CreatePoint
- Crie os arquivos CreatePoint/index.tsx e CreatePoint/style.css

```javascript
// CreatePoint/index.tsx

import React from 'react';

import './styles.css'

import logo from '../../assets/logo.svg';

const CreatePoint = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta"/>
        </header>

        <main>
          <h1>CreatePoint.</h1>
        </main>
      </div>
    </div>
  );
}

export default CreatePoint;
```

- Criar o arquivo src/routes.ts

```javascript
// routes.tsx

import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CreatePoint} path="/create-point" />
    </BrowserRouter>
  );
}

export default Routes;
```

- Alterar o arquivo Home/index.tsx

```javascript
// Home/index.tsx

import React from 'react';

import { Link } from 'react-router-dom'

import './styles.css'

import logo from '../../assets/logo.svg';

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta"/>
        </header>

        <main>
          <h1>Seu marketplace de coleta de resíduos.</h1>
          <p>Ajudamos pessoas a econtrarem pontos de coleta de forma eficiente.</p>

          <Link to="/create-point">
            <span> > </span>
            <strong>Cadastre um ponto de coleta</strong>
          </Link>
        </main>
      </div>
    </div>
  );
}

export default Home;
```

- Alterar o arquivo CreatePoint/index.tsx

```javascript
import React from 'react';

import { Link } from 'react-router-dom'

import './styles.css'

import logo from '../../assets/logo.svg';

const CreatePoint = () => {
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta"/>

        <Link to="/">
          <span> </span>
          <strong>Voltar para home</strong>
        </Link>
      </header>

      <form>
        <h1>Cadastro do <br/> ponto de coleta</h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"/>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"/>
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"/>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado</label>
              <select name="uf" id="uf">
                <option value="0">Selecione um Estado</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city">
                <option value="0">Selecione uma Cidade</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ul className="items-grid">
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="teste"/>
              <span>Óleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="teste"/>
              <span>Óleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="teste"/>
              <span>Óleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="teste"/>
              <span>Óleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="teste"/>
              <span>Óleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="teste"/>
              <span>Óleo de cozinha</span>
            </li>
          </ul>
        </fieldset>

        <button type="submit">
          Cadastrar ponto de coleta
        </button>
      </form>

    </div>
  );
}

export default CreatePoint;
```

- Instalar o leaftlet `npm install leaflet react-leaflet` para implementar a seleção de locais do mapa
- Instalar o types/react-leaflet `npm install @types/react-leaflet -D`
- Altear o arquivo index.html para inserir o css do leaflet

```html
<!--  index.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#34CB79" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto&family=Ubuntu:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" 
      href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
      integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
      crossorigin=""/>
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

- Inserir o trecho de código do Mapa

```javascript
<Map center={[ -22.3357005, -49.0514103 ]} zoom={15}>
  <TileLayer 
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  <Marker position={[ -22.3357005, -49.0514103 ]} />
</Map>
```

- Instalar o axios `npm install axios`
- Criar a pasta src/services
- Criar o arquivo services/api.js

```javascript
// api.ts

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

export default api;
```

- Inserir nos arquivos CreatePoint/index.tsx e Home/index.tsx o import para a api.ts
- Alterar o arquivo CreatePoint/index.tsx para incluir os dados dinâmicos

```javascript
// CreatePoint/index.tsx

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

import { Link, useHistory } from 'react-router-dom'
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';

import './styles.css'

import logo from '../../assets/logo.svg';

// array ou objeto: manualmente informamos o tipo da variável
interface Item {
  id: number;
  title: string;
  image_url: string
}

interface IBGEUFResponse {
  nome: string,
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

const CreatePoint = () => {
  // variaveis e seus métodos para altera-las
  // listas
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  // posição inicial do usuário
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  // formulário de dados
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });

  // itens selecionados
  const [selectedUf, setSelectedUf] = useState<string>('0');
  const [selectedCity, setSelectedCity] = useState<string>('0');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

  // permite navegar de um component para outro sem utilizar botões
  const history = useHistory();

  // chamadas das atribuições das variaveis
  // primeiro parametro: o que vai ser executado
  // segundo parametro: quando vai ser executado, com [], será executado apenas uma vez.
  
  // inicia marcação no mapa
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    })
  }, []);

  // carrega lista de item
  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    });
  }, []);

  // carrega lista de estados
  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  // carrega lista de cidades
  // executado apenas se alterar a variavel selectedUf
  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  // função de monitora alterações na lista de estados
  // recebe como tipo um evento de alteração no elemento select do html
  // ver mais: typescript react cheatsheet
  // executa ao escolher um estado
  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;

    setSelectedUf(uf);
  }

  // executa ao escolher uma cidade
  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;

    setSelectedCity(city);
  }

  // executa ao clicar no mapa
  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ]);
  }

  // executa ao alterar dados dos inputs
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    // nome e valor do input
    const { name, value } = event.target

    // usando o spread operator para copiar os dados anteriores
    // depois alterando o valor do campo que foi modificado
    setFormData({ ...formData, [name]: value })
  }

  function handleSelectedItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([ ...selectedItems, id ]);
    }
  }

  async function handleSubmit(event: FormEvent) {
    // evitando reload
    event.preventDefault();

    const { name, email, whatsapp } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems;

    const data = {
      name,
      email,
      whatsapp,
      uf,
      city,
      latitude,
      longitude,
      items
    };

    await api.post('points', data);

    alert('Ponto de coleta criado!');

    history.push('/');
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta"/>

        <Link to="/">
          <span> </span>
          <strong>Voltar para home</strong>
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro do <br/> ponto de coleta</h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input 
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer 
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectedUf}
              >
                <option value="0">Selecione um Estado</option>
                {ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectedCity}
              >
                <option value="0">Selecione uma Cidade</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map(item => (
              <li
                key={item.id}
                onClick={() => handleSelectedItem(item.id)}
                className={selectedItems.includes(item.id) ? 'selected': ''}
              >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">
          Cadastrar ponto de coleta
        </button>
      </form>

    </div>
  );
}

export default CreatePoint;
```
