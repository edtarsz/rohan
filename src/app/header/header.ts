import { Component, inject, OnInit } from '@angular/core';
import { Menu } from "../menu/menu";
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-header',
  imports: [Menu],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  menuService: MenuService;

  constructor(menuService: MenuService) {
    this.menuService = menuService;
  }

  ngOnInit() {
    this.menuService.isMenuVisible$.subscribe(visible => {
      if (visible) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    });
  }

  toggleMenu() {
    return this.menuService.toggleMenu();
  }
}
