import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game } from '../games-list/games-list.component';
import { GamesDataService } from '../services/game/games-data.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  game: Game = {} as Game;

  constructor(private gamesDataService: GamesDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const gameId: string = this.route.snapshot.params.gameId;
    this.getGame(gameId);
  }

  private getGame(gameId: string): void {
    this.gamesDataService.getGame(gameId)
      .then((response) => this.reveivedGame(response))
      .catch(this.handleError);
  }


  private reveivedGame(game: Game) {
    console.log("Game Recieved ", game);
    this.game = game;
  }

  private handleError(error: any) {
    console.log("Error ", error);
    
  }

}
