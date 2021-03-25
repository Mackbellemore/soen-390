import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpDelete, results, httpPost } from 'inversify-express-utils';
import TYPES from '../constants/types';
import { BaseController } from './BaseController';
import { IMachine } from '../models/MachineModel';
import { MachineService } from './../services/MachineService';

@controller('/machine')
export class MachineController extends BaseController {
  constructor(@inject(TYPES.MachineService) private machineService: MachineService) {
    super();
  }

  @httpGet('/')
  public async get(): Promise<results.JsonResult> {
    try {
      const machines: IMachine[] = await this.machineService.getMachines();
      return this.json(machines);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpPost('/')
  public async post(request: Request): Promise<results.JsonResult> {
    try {
      const machine: IMachine = await this.machineService.createMachine(request.body);
      return this.json(machine);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpDelete('/')
  public async delete(request: Request): Promise<results.JsonResult> {
    try {
      const machine = await this.machineService.deleteMachine(request.body);
      return this.json(machine);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpGet('/:machineName')
  public async getByMachineName(request: Request): Promise<results.JsonResult> {
    try {
      const machine: IMachine = await this.machineService.getByMachineName(
        request.params.machineName
      );
      return this.json(machine);
    } catch (err) {
      return this.handleError(err);
    }
  }
}
