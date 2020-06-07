import express, { response } from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer'

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

// adicionando upload como parametro antes da chamada do método
routes.post(
    '/points', 
    upload.single('image'),
    // [TODO]: mover para outro arquivo
    celebrate({
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required(),
        items: Joi.string().required() // [TODO]: validar se é um array
      })
    }, 
      {
        abortEarly: false
      }
    ),
    pointsController.create
  );



export default routes;

// melhorias:
// service pattern
// repository pattern


