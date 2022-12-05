import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerModel } from '../../models/players/player.model';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private hostURl: string;

  constructor(private http: HttpClient) {
    this.hostURl = environment.host;
  }

  public getAll(): Observable<PlayerModel[]> {
    return this.http
      .get<PlayerModel[]>(`${this.hostURl}/api/players`)
      .pipe(map(result => _.map(result, (t) => new PlayerModel(t))));
  }

  public getById(username: string): Observable<PlayerModel> {
    return this.http
      .get<PlayerModel>(`${this.hostURl}/api/player/${username}`)
      .pipe(map(result => new PlayerModel(result)));
  }

  public create(resource: PlayerModel): Observable<PlayerModel> {
    return this.http
      .post<PlayerModel>(`${this.hostURl}/api/players`, resource)
      .pipe(map(result => new PlayerModel(result)));
  }

  public update(resource: PlayerModel): Observable<PlayerModel> {
    return this.http
      .put<PlayerModel>(`${this.hostURl}/api/players/${resource.username}`, resource)
      .pipe(map(result => new PlayerModel(result)));
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.hostURl}/api/players/${id}`);
  }

}
