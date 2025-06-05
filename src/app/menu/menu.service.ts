import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private isMenuVisibleSubject = new BehaviorSubject<boolean>(false);
    isMenuVisible$ = this.isMenuVisibleSubject.asObservable();

    get isMenuVisible(): boolean {
        return this.isMenuVisibleSubject.value;
    }

    toggleMenu(): void {
        this.isMenuVisibleSubject.next(!this.isMenuVisible);
    }
}