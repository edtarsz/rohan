import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class MenuService {
    private showMenu: boolean = false;

    toggleMenu(): void {
        this.showMenu = !this.showMenu;
    }

    get isMenuVisible(): boolean {
        return this.showMenu;
    }
}