import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core'
import { Room } from '../../models/room'
import { RoomService } from '../../services/room.service'
import { Event, Router } from '@angular/router'

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = []
  errorMessage: string = ''
  searchText: string = ''
  timeOut: any

  constructor (private service: RoomService, private router: Router) {}

  ngOnInit (): void {
    this.loadRooms()
  }

  loadRooms (): void {
    this.service.getRooms().subscribe({
      next: (data: Room[]) => {
        this.rooms = data.filter(room =>
          room.name.toLowerCase().includes(this.searchText.toLowerCase())
        )
      },
      error: () => {
        this.errorMessage = 'Error in fetching all rooms'
      }
    })
  }

  onDelete (id: number | undefined): void {
    this.service.deleteRoom(id).subscribe({
      next: () => {
        this.loadRooms()
      },
      error: () => {
        this.errorMessage = 'Error in deleting room'
      }
    })
  }

  onEdit (id: number | undefined): void {
    this.router.navigate([`/edit-rooms/${id}`])
  }

  onSearch (): void {
    if (this.timeOut) {
      clearTimeout(this.timeOut)
    }
    this.timeOut = setTimeout(() => {
      console.log(this.searchText)
      this.loadRooms()
    }, 500)
  }

  onSort () {
    this.rooms.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
  }

  onChangeSort (event: any) {
    const value = (event.target as HTMLInputElement).value
    console.log('Sort by:', value)

    this.rooms.sort((a, b) => {
      if (a[value] < b[value]) return -1
      if (a[value] > b[value]) return 1
      return 0 // for equal values
    })
  }
}
