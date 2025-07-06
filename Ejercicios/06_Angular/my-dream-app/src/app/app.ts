import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'my-dream-app';
  name : string;
  email : string;
  webpage : string;
  hobbies : string[];
  showHobbies: boolean;

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
} 
