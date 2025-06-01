import { Component, inject } from '@angular/core';
import { Menu } from "../menu/menu";
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-header',
  imports: [Menu],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  menuService: MenuService;

  constructor(menuService: MenuService) {
    this.menuService = menuService;
  }

  toggleMenu() {
    return this.menuService.toggleMenu();
  }
}
