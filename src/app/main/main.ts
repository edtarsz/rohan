import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { MenuService } from '../menu/menu.service';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main implements AfterViewInit, OnDestroy {
  private lenis!: Lenis;
  private animation!: GSAPTimeline;

  constructor(public menuService: MenuService) {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {

  }

  private initSmoothScroll(): void {

  }

  private setupHeroAnimation(): void {

  }
}