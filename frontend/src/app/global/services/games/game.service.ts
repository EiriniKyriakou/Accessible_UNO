import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameModel } from '../../models/games/game.model';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private hostURl: string;

  constructor(private http: HttpClient) {
    this.hostURl = environment.host;
  }

  public getAll(): Observable<GameModel[]> {
    return this.http
      .get<GameModel[]>(`${this.hostURl}/api/games`)
      .pipe(map(result => _.map(result, (t) => new GameModel(t))));
  }

  public getById(id: string): Observable<GameModel> {
    return this.http
      .get<GameModel>(`${this.hostURl}/api/games/${id}`)
      .pipe(map(result => new GameModel(result)));
  }

  public create(resource: GameModel): Observable<GameModel> {
    return this.http
      .post<GameModel>(`${this.hostURl}/api/games`, resource)
      .pipe(map(result => new GameModel(result)));
  }

//   public update(resource: GameModel): Observable<GameModel> {
//     return this.http
//       .put<GameModel>(`${this.hostURl}/api/games/${resource.username}`, resource)
//       .pipe(map(result => new GameModel(result)));
//   }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.hostURl}/api/games/${id}`);
  }

}