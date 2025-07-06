import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HelloWorldComponent } from './hello-world/hello-world';
import { UserComponent } from './user/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HelloWorldComponent, UserComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class AppComponent {
  title = 'my-dream-app';
  name : string;
  email : string;
  webpage : string;
  hobbies : string[];
  showHobbies: boolean;
  users = ['ryan','joe','cameron','john'];
  activated = false;

  constructor() {
    console.log("Constructor working...");
    this.name = "Brayan Carlos A. C.";
    this.email = "bauccacusi@unsa.edu.pe";
    this.webpage = "https://www.unsa.edu.pe";
    this.hobbies = ["Futbol", "Programación", "Netflix"];
    this.showHobbies = false;
  }
  /*showhobbies() {
    return true;
  }*/
  toggleHobbies() {
    this.showHobbies = !this.showHobbies;
  }
  
  newHobby(hobby : any) {
    this.hobbies.push(hobby.value);
    hobby.value = "";
    return false
  }

  sayHello() {
    console.log("Click detectado");
    alert("Hola desde AppComponent")
  }

  deleteUser(user : any) {
    for (let i=0; i<this.users.length; i++) {
      if(user==this.users[i]) {
        this.users.splice(i, 1);
      }
    }
  }
} 
