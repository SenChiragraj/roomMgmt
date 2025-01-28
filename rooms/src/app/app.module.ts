import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { AddRoomComponent } from './components/add-room/add-room.component'
import { RoomListComponent } from './components/room-list/room-list.component'
import { EditRoomComponent } from './components/edit-room/edit-room.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    AddRoomComponent,
    RoomListComponent,
    EditRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
