import { Component } from '@angular/core';
import { Room } from '../../models/room';
import { OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  constructor(private service : RoomService, private router : Router ) { }

  rooms: Room[] = []
  errorMessage: string = '';

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms() {
    this.service.getRooms().subscribe({
      next: (data: Room[]) => {
        this.rooms = data;
      },
      error: () => {
        this.errorMessage = "Error in fetching  all rooms";
      }
    });
  }

  onDelete(id : string = '') {
    this.service.deleteRoom(id).subscribe({
      next: () => {
        this.loadRooms();
      },
      error: (error) => {
        this.errorMessage = "Error in deleting room";
      }
    });
  }

  onEdit(id: string = '') {
    console.log('edit');

    this.router.navigate([`/edit-rooms/${id}`]);
  }

}
