import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ContentService, PortfolioContent } from './content.service';
type Project = PortfolioContent['projects'][number];
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './project-dialog.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private cs = inject(ContentService);
  private el = inject(ElementRef);
  private prev: HTMLElement | null = null;
  content = signal<PortfolioContent | null>(null);
  dark = signal(false);
  selected = signal<Project | null>(null);
  scrolled = signal(false);
  progress = signal(0);
  toastMessage = signal<string | null>(null);
  showBackToTop = signal(false);
  private toastTimer: any = null;
  @HostListener('window:scroll') onScroll() {
    const y = window.scrollY;
    if (!this.scrolled() && y > 50) {
      this.scrolled.set(true);
    } else if (this.scrolled() && y < 15) {
      this.scrolled.set(false);
    }
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.progress.set(max > 0 ? (y / max) * 100 : 0);
    this.showBackToTop.set(y > 450);
  }
  async ngOnInit() {
    this.content.set(await this.cs.load());
    this.scrolled.set(window.scrollY > 50);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.progress.set(max > 0 ? (window.scrollY / max) * 100 : 0);
    this.showBackToTop.set(window.scrollY > 450);
  }
  ngOnDestroy() {
    document.body.classList.remove('dialog-open');
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }
  @HostListener('document:keydown.escape') close() {
    if (!this.selected()) return;
    this.selected.set(null);
    document.body.classList.remove('dialog-open');
    this.prev?.focus();
  }
  open(p: Project, e: Event) {
    this.prev = e.currentTarget as HTMLElement;
    this.selected.set(p);
    document.body.classList.add('dialog-open');
    setTimeout(() => {
      const close = this.el.nativeElement.querySelector('[data-close]') as HTMLElement | null;
      close?.focus();
    });
  }
  toggleTheme() {
    this.dark.update((x) => !x);
    document.body.classList.toggle('dark', this.dark());
  }
  mailto(c: PortfolioContent) {
    return `mailto:${c.profile.email}`;
  }
  async onEmailClick(e: MouseEvent, email: string) {
    if (e.ctrlKey || e.metaKey || e.button !== 0) return;
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      this.showToast('Email copied to clipboard');
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }
  showToast(msg: string) {
    this.toastMessage.set(msg);
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastMessage.set(null), 2200);
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
