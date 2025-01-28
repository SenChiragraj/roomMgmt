import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Room } from 'src/app/models/room'
import { RoomService } from 'src/app/services/room.service'

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit {
  addForm: any
  errorMessage: string = ''
  newRoomData: Room = {
    name: '',
    floor: '',
    capacity: 0,
    lastInspection: '',
    status: 'Under Maintenance'
  }

  constructor (
    private fb: FormBuilder,
    private service: RoomService,
    private router: Router
  ) {}

  ngOnInit (): void {
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      floor: ['', Validators.required],
      capacity: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  onSubmit (): void {
    if (this.addForm.valid) {
      this.newRoomData = this.addForm.value
      this.newRoomData.lastInspection = new Date().toDateString()
      console.log('New Room:', this.newRoomData)
      this.service.addRoom(this.newRoomData).subscribe({
        next: () => {
          this.router.navigate(['/'])
        },
        error: () => {
          this.errorMessage = 'Error in adding room'
        }
      })
    } else {
      this.errorMessage =
        'Form is invalid. Please fix the errors and try again.'
    }
  }
}
