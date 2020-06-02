import { Injectable } from '@angular/core';
import { IConfiguration } from '../models/config.model';

@Injectable()
export class ConfigOptionsService {
  private config: IConfiguration = {
    id: -1
  };

  constructor(){}

  setConfig(inputConfig: IConfiguration){
    for (const key in inputConfig) {
      this.config[key] = inputConfig[key];
    }
  }

  getConfig(): IConfiguration {
    return this.config;
  }
}
