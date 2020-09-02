import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserServices';
import ListUserServices from '@modules/users/services/ListUserServices';
import { classToClass } from 'class-transformer';

class UsersControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name, email, phone, password,
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name, email, phone, password,
    });

    return response.json(classToClass(user));
  }

  // TODO change this method to another controller UsersServicesControllers.ts

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listServices = container.resolve(ListUserServices);

    const services = await listServices.execute(id);

    return response.json(services);
  }
}

export default UsersControllers;
