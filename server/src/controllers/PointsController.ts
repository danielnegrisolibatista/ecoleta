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