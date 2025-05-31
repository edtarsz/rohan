import { Component } from '@angular/core';
import { Header } from "./header/header";
import { Main } from "./main/main";

@Component({
  selector: 'app-root',
  imports: [Header, Main],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'rohan';
}
