import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpDelete, results, httpPost } from 'inversify-express-utils';
import TYPES from '../constants/types';
import { BaseController } from './BaseController';
import { IMachine } from '../models/MachineModel';
import { MachineService } from './../services/MachineService';
import { Doc } from 'inversify-express-doc';

@controller('/machine')
export class MachineController extends BaseController {
  constructor(@inject(TYPES.MachineService) private machineService: MachineService) {
    super();
  }

  @Doc('Get All Machines')
  /**
   * @desc          Get All Machines
   * @route         GET /machine
   * @access        Public
   * @returns       List Machine JSON Format
   */
  @httpGet('/')
  public async get(): Promise<results.JsonResult> {
    try {
      const machines: IMachine[] = await this.machineService.getMachines();
      return this.json(machines);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Create Machine')
  /**
   * @desc          Create Machine
   * @route         POST /machine
   * @access        Public
   * @param request
   * @returns       Machine JSON Format
   */
  @httpPost('/')
  public async post(request: Request): Promise<results.JsonResult> {
    try {
      const machine: IMachine = await this.machineService.createMachine(request.body);
      return this.json(machine);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Delete Scheduling')
  /**
   * @desc          Delete Machine
   * @route         DELETE /machine
   * @access        Public
   * @param request
   * @returns       Machine JSON Format
   */
  @httpDelete('/')
  public async delete(request: Request): Promise<results.JsonResult> {
    try {
      const machine = await this.machineService.deleteMachine(request.body);
      return this.json(machine);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Get Machine by Name')
  /**
   * @desc          Get Machine By Name
   * @route         GET /machine/:machineName
   * @access        Public
   * @param request
   * @returns       Machine JSON Format
   */
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
