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

    public total:number;
    public p:number = 0;
    public start:any;
    public limit:any;

    constructor(private _configuration: Configuration,  private _dataService: DataService)
    {}

    public getPlayers(start,limit){

      this._dataService
            .findAll(this.path, {_start: start,_limit: limit})
            .subscribe((data) => {
              this.total = data.headers.get('x-total-count');
              this.start = start;
              this.limit = limit;
              
              const end = (this.total / limit);
              this.players = data.body;

              this.paginationControl(this.p, this.total, end);

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

    public paginationControl(p, total, end){
      end = end - 1;
      if(this.p >= (end - 1)){
        this.p = this.p;
        console.log("se acabo");
      }
      this.p = this.p + 1;
      console.log(this.p);
      console.log(end);
    }


}
