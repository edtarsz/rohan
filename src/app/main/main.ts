import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { MenuService } from '../menu/menu.service';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

@Component({
  selector: 'app-main',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Main implements AfterViewInit, OnDestroy {
  private lenis: Lenis | null = null;
  private scrollTriggers: ScrollTrigger[] = [];
  private menuSubscription: any;

  constructor(public menuService: MenuService) { }

  ngAfterViewInit(): void {
    this.initAnimations();

    // Escuchar cambios en el menú
    this.menuSubscription = this.menuService.isMenuVisible$.subscribe(visible => {
      if (!visible) {
        // Reiniciar animaciones cuando se cierra el menú
        setTimeout(() => this.refreshAnimations(), 100);
      } else {
        // Detener animaciones cuando se abre el menú
        this.destroyAnimations();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyAnimations();
    if (this.menuSubscription) {
      this.menuSubscription.unsubscribe();
    }
  }

  private initAnimations(): void {
    gsap.registerPlugin(ScrollTrigger);

    // Inicializar Lenis para scroll suave
    this.lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
    });

    this.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      this.lenis?.raf(time * 1000);
    });

    // Configurar animaciones
    this.setupScrollAnimations();
  }

  private setupScrollAnimations(): void {
    // Limpiar triggers existentes
    this.scrollTriggers.forEach(st => st.kill());
    this.scrollTriggers = [];

    // Crear nuevas animaciones
    const animations = [
      {
        selector: '#main-background img',
        config: {
          scrollTrigger: {
            trigger: 'main',
            start: 'top-=300 top',
            end: '+=1300',
            scrub: true,
          },
          scale: 1,
          ease: 'power2.inOut'
        }
      },
      {
        selector: '#main-hero',
        config: {
          scrollTrigger: {
            trigger: 'main',
            start: 'top-=400 top',
            end: '+=2000',
            scrub: true,
          },
          scale: 0.5,
          ease: 'power2.inOut'
        }
      },
      {
        selector: '#resident',
        config: {
          scrollTrigger: {
            trigger: '#resident',
            start: 'top top',
            end: '+=350',
            scrub: true,
          },
          scale: 0.8,
          opacity: 0,
          ease: 'power1.inOut'
        }
      },
      {
        selector: '#container-arrow',
        config: {
          scrollTrigger: {
            trigger: '#resident',
            start: 'top top',
            end: '+=350',
            scrub: true,
          },
          scale: 0.8,
          opacity: 0,
          ease: 'power2.inOut'
        }
      }
    ];

    // Crear animaciones y guardar los triggers
    animations.forEach(anim => {
      const tween = gsap.to(anim.selector, anim.config);
      if (tween.scrollTrigger) {
        this.scrollTriggers.push(tween.scrollTrigger);
      }
    });
  }

  private refreshAnimations(): void {
    // Refrescar ScrollTrigger y Lenis
    ScrollTrigger.refresh();
    if (this.lenis) {
      this.lenis.resize();
      this.lenis.scrollTo(0, { immediate: true });
    }

    // Recrear animaciones
    this.setupScrollAnimations();
  }

  private destroyAnimations(): void {
    // Matar todos los ScrollTriggers
    this.scrollTriggers.forEach(st => st.kill());
    this.scrollTriggers = [];

    // Detener Lenis
    if (this.lenis) {
      gsap.ticker.remove(this.lenis.raf);
      this.lenis.destroy();
      this.lenis = null;
    }

    // Resetear todas las animaciones GSAP
    gsap.globalTimeline.clear();
  }
}