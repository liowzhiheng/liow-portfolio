import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { ContentService, PortfolioContent } from './content.service';

@Component({ selector: 'app-home', imports: [], templateUrl: './home.component.html', styleUrl: './home.component.scss' })
export class HomeComponent implements OnInit, OnDestroy {
  private cs = inject(ContentService);
  content = signal<PortfolioContent | null>(null); dark = signal(false); scrolled = signal(false); contactMode = signal(false); activeSection = signal('top');
  private ticking = false;
  private readonly onScroll = () => { if (this.ticking) return; this.ticking = true; requestAnimationFrame(() => { this.scrolled.set(scrollY > 32); const ids = ['top', 'about', 'work', 'contact']; const active = ids.filter(id => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= innerHeight * .42).at(-1) ?? 'top'; this.activeSection.set(active); this.contactMode.set(active === 'contact'); this.ticking = false; }); };
  async ngOnInit() { this.content.set(await this.cs.load()); addEventListener('scroll', this.onScroll, { passive: true }); this.onScroll(); }
  ngOnDestroy() { removeEventListener('scroll', this.onScroll); }
  toggleTheme() { this.dark.update(x => !x); document.body.classList.toggle('dark', this.dark()); }
  mailto(c: PortfolioContent) { return `mailto:${c.profile.email}`; }
}
