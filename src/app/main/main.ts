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
export class Main implements AfterViewInit {
  menuService: MenuService;

  constructor(menuService: MenuService) {
    this.menuService = menuService;
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.to('#main-background img', {
      scrollTrigger: {
        trigger: 'main',
        start: 'top-=300 top',
        end: '+=1300',
        scrub: true,
      },
      scale: 1,
      ease: 'power2.inOut'
    });

    gsap.to('#main-hero', {
      scrollTrigger: {
        trigger: 'main',
        start: 'top-=400 top',
        end: '+=2000',
        scrub: true,
        markers: false,
      },
      scale: 0.5,
      ease: 'power2.inOut'
    });

    gsap.to('#resident', {
      scrollTrigger: {
        trigger: '#resident',
        start: 'top top',
        end: '+=350',
        scrub: true,
        markers: false,
      },
      scale: 0.8,
      opacity: 0,
      ease: 'power1.inOut'
    });

    gsap.to('#container-arrow', {
      scrollTrigger: {
        trigger: '#resident',
        start: 'top top',
        end: '+=350',
        scrub: true,
        markers: false,
      },
      scale: 0.8,
      opacity: 0,
      ease: 'power2.inOut'
    });
  }
}