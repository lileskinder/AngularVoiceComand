import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Game } from '../../games-list/games-list.component';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {
  private apiBaseUrl: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }
  public getGames(): Promise<Game[]> {
    const url: string = this.apiBaseUrl + "/games";
    return this.http.get(url).toPromise()
      .then(response => response as Game[])
      .catch(this.handleError);
  }

  public getGame(gameId: string): Promise<Game> {
    const url: string = this.apiBaseUrl + "/games/"+gameId;
    return this.http.get(url).toPromise()
      .then(response => response as Game)
      .catch(this.handleError);
  }

  public addGame(data: any): Promise<Game> {
    const url: string = this.apiBaseUrl + "/games";
    return this.http.post(url, data).toPromise()
      .then(response => response as Game)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log("Something went wronge");
    return Promise.reject(error.message || error);
  }
}


