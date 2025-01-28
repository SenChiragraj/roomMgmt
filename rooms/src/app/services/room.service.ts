import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Room } from '../models/room'

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor (private http: HttpClient) {}

  apiurl: string =
    'https://jubilant-garbanzo-x7gjxgvgpr4365r5-3000.app.github.dev/rooms'

  getRooms (): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiurl)
  }

  addRoom (room: Room): Observable<void> {
    return this.http.post<void>(this.apiurl, room)
  }

  deleteRoom (id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiurl}/${id}`)
  }

  updateRoom (id: number | undefined, room: Room): Observable<void> {
    return this.http.put<void>(`${this.apiurl}/${id}`, room)
  }

  getRoomById (id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiurl}/${id}`)
  }
}
