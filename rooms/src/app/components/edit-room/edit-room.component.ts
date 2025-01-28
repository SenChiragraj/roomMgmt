import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Room } from 'src/app/models/room'
import { RoomService } from 'src/app/services/room.service'

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.scss']
})
export class EditRoomComponent implements OnInit {
  editForm: any
  id: number | undefined
  errorMessage: string = ''

  constructor (
    private fb: FormBuilder,
    private service: RoomService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      floor: ['', [Validators.required, Validators.minLength(1)]],
      capacity: [0, [Validators.required, Validators.min(1)]],
      lastInspection: [new Date().toDateString(), [Validators.required]],
      status: ['Under Maintenance', [Validators.required]]
    })
  }

  ngOnInit (): void {
    this.id = this.route.snapshot.params['id']
  }

  room: Room = {
    name: '',
    floor: '',
    capacity: 0,
    lastInspection: '',
    status: 'Under Maintenance'
  }

  saveRoom () {
    if (this.editForm.valid) {
      this.service.updateRoom(this.id, this.editForm.value).subscribe({
        next: () => {
          this.router.navigate(['/rooms'])
        },
        error: () => {
          this.errorMessage = 'There was an error updating the room'
        }
      })
    }
  }
}
