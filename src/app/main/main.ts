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
        scrub: 2,
      },
      scale: 1,
      ease: 'power2.inOut'
    });

    gsap.to('#main-hero', {
      scrollTrigger: {
        trigger: 'main',
        start: 'top-=400 top',
        end: '+=2000',
        scrub: 2,
        markers: false,
      },
      scale: 0.5,
      ease: 'power2.inOut'
    });

    gsap.to('#resident', {
      scrollTrigger: {
        trigger: 'main',
        start: 'top top',
        end: '+=200',
        scrub: 2,
        markers: false,
      },
      scale: 0.5,
      opacity: 0,
      ease: 'power2.inOut'
    });

    gsap.to('.container-arrow', {
      scrollTrigger: {
        trigger: 'main',
        start: 'top top',
        end: '+=200',
        scrub: 2,
        markers: false,
      },
      scale: 0.5,
      opacity: 0,
      ease: 'power2.inOut'
    });


  }
}