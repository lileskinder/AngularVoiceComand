import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';

import { GamesDataService } from '../services/game/games-data.service';

import {
  continuous,
  skipUntilSaid,
  SpeechRecognitionService,
  takeUntilSaid,
} from '@ng-web-apis/speech';

import { Observable } from 'rxjs';
import { map, repeat, retry, share } from 'rxjs/operators';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})

export class GamesListComponent implements OnInit {
  title: string = "MEAN Games";
  game: Game = {} as Game;
  newTitle = "";
  newPrice = "";
  newYear = "";
  newRate = "";
  newMinPlayers = "";
  newMaxPlayers = "";
  newMinAge = "";
  newDesigners = "";
  errorMessage = "";
  success = "";


  transcript!: string;
  query = this.transcript;


  games: Game[] = [];


  constructor(private gamesDataService: GamesDataService, @Inject(SpeechRecognitionService)
  private readonly recognition$: Observable<SpeechRecognitionResult[]>,) { }



  public addGame(): void {
    if (this.newTitle == "" || this.newPrice == "" ||
      this.newDesigners == "" || this.newMaxPlayers == "" ||
      this.newMinAge == "" || this.newMinPlayers == "" ||
      this.newYear == "" || this.newRate == "") {
      this.errorMessage = "All Fields are required!!!";
    } else {
      const game = {
        title: this.newTitle,
        price: this.newPrice,
        year: this.newYear,
        rate: this.newRate,
        minPlayers: this.newMinPlayers,
        minAge: this.newMinAge,
        maxPlayers: this.newMaxPlayers,
        designers: this.newDesigners,
      }
      console.log(game);
      this.gamesDataService.addGame(game).then(() => this.success = " successfully added");
    }

  }


  isAuthenticated() {
    return localStorage.getItem("jwt-token");
  }

  get record$(): Observable<SpeechRecognitionResult[]> {
    return this.result$.pipe(
      map(a => {
        this.transcript = a[0][0].transcript;
        console.log(a[0][0].transcript);
        return a
      }),
      skipUntilSaid('start'),
      takeUntilSaid('end'),
      repeat(),
      continuous(),

    );
  }

  private get result$(): Observable<SpeechRecognitionResult[]> {
    return this.recognition$.pipe(retry(), repeat(), share());
  }

  ngOnInit(): void {
    this.getGames();
    console.log(this.games);
  }
  state!: any;
  public startRecord(): void {
    this.record$.subscribe();
  }
  

  public stopRecord(): void {
    this.record$;
  }

  public getGames(): void {
    this.gamesDataService.getGames()
      .then(foundGames => this.games = foundGames);
  }

  public search(event:any){
    this.query = event.target.value;
  }
}


export class Game {
  _id!: string;
  title!: string;
  price!: number;
  year!: number;
  minAge!: number;
  maxPlayers!: number;
  minPlayers!: number;
}
