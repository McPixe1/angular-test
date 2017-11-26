import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../shared/services/player.service';
import {Player} from '../../shared/models/player.model';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
  providers: [PlayerService]
})

export class PlayersComponent implements OnInit {

  public message: string;

  constructor(
      private _playerService: PlayerService) {
      this.message = 'PlayersComponent cargado';
  }

  ngOnInit() {
    this._playerService.getPlayers();
    this._playerService.getPlayer(1);
  }

}
