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
  private tickerCallback: any;
  private savedScrollPosition: number = 0;

  constructor(public menuService: MenuService) {
    this.tickerCallback = (time: number) => {
      this.lenis?.raf(time * 1000);
    };
  }

  ngAfterViewInit(): void {
    this.initAnimations();

    this.menuSubscription = this.menuService.isMenuVisible$.subscribe(visible => {
      if (visible) {
        this.saveScrollPosition();
        this.pauseAnimations();
      } else {
        this.resumeAnimations();
        setTimeout(() => {
          this.restoreScrollPosition();
          this.refreshScroll();
        }, 100);
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

    this.lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      syncTouch: true,
      prevent: () => false
    });

    this.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(this.tickerCallback);

    this.setupScrollAnimations();
  }

  private setupScrollAnimations(): void {
    this.scrollTriggers.forEach(st => st.kill());
    this.scrollTriggers = [];

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

    animations.forEach(anim => {
      const tween = gsap.to(anim.selector, anim.config);
      if (tween.scrollTrigger) {
        this.scrollTriggers.push(tween.scrollTrigger);
      }
    });
  }

  private saveScrollPosition(): void {
    this.savedScrollPosition = this.lenis?.scroll || window.scrollY;
  }

  private restoreScrollPosition(): void {
    if (this.lenis) {
      this.lenis.scrollTo(this.savedScrollPosition, { immediate: true });
    } else {
      window.scrollTo(0, this.savedScrollPosition);
    }
  }

  private pauseAnimations(): void {
    this.scrollTriggers.forEach(st => st.disable());
    gsap.ticker.remove(this.tickerCallback);

    if (this.lenis) {
      this.lenis.stop();
    }
  }

  private resumeAnimations(): void {
    this.scrollTriggers.forEach(st => st.enable());
    gsap.ticker.add(this.tickerCallback);

    if (this.lenis) {
      this.lenis.start();
    }
  }

  private refreshScroll(): void {
    ScrollTrigger.refresh();
    if (this.lenis) {
      this.lenis.resize();
    }
  }

  private destroyAnimations(): void {
    this.scrollTriggers.forEach(st => st.kill());
    this.scrollTriggers = [];

    if (this.lenis) {
      gsap.ticker.remove(this.tickerCallback);
      this.lenis.destroy();
      this.lenis = null;
    }
  }
}