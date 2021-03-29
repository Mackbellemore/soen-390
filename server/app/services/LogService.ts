import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import { LogRepository } from './../repository/LogRepository';
import { ILog } from '../models/LogModel';

@injectable()
export class LogService {
  ticketIdCount: number;
  constructor(@inject(TYPES.LogRepository) private logRepo: LogRepository) {}

  public async addLog(log: ILog): Promise<void> {
    this.logRepo.create(log);
  }

  public async getLogs(): Promise<ILog[]> {
    return this.logRepo.getList();
  }
}
