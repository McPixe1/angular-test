import 'rxjs/add/operator/map';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Configuration } from '../../app.constants';
import {Player} from '../../shared/models/player.model';

@Injectable()
export class PlayerService {

    public players: any[];
    public player: any[];
    public path = 'posts';

    constructor(private _configuration: Configuration,  private _dataService: DataService)
    {}

    public getPlayers(){
      this._dataService
            .findAll(this.path, {_start:0,_limit:5})
            .subscribe((data) => {
              this.players = data.body;
              console.log(data);
            });
    }

    public getPlayer(id){
      this._dataService
            .findOne(this.path, id)
            .subscribe((data) => {
              this.player = data;
              console.log(data);
            });
    }


}
