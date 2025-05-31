import { Component } from '@angular/core';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {
  menuService: MenuService;

  constructor(menuService: MenuService) {
    this.menuService = menuService;
  }

  toggleMenu() {
    return this.menuService.toggleMenu();
  }
}
