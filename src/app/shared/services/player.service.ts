import 'rxjs/add/operator/map';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Configuration } from '../../app.constants';
import {Player} from '../../shared/models/player.model';

@Injectable()
export class PlayerService {

    public players: Player[];
    public values: any[];
    public path = 'posts';

    constructor(private _configuration: Configuration,  private _dataService: DataService)
    {}

    public getPlayers(){
      this._dataService
            .findAll(this.path)
            .subscribe((data: any[]) => {
              this.values = data;
              console.log(data);
            });
    }

    public getPlayer(id){
      this._dataService
            .findOne(this.path, id)
            .subscribe((data: any[]) => {
              this.values = data;
              console.log(data);
            });
    }


}
