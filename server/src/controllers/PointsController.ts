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

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `http://192.168.0.105:3333/uploads/${point.image}`
      }
    });

    response.status(200).json(serializedPoints);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json( { message: 'Point not found'});
    }

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.0.105:3333/uploads/${point.image}`
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title')

    return response.status(200).json(
      {
        point: serializedPoint,
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
      image: request.file.filename,
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
  
    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
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