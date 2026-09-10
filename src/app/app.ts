import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<div class="progress" [style.width.%]="progress()"></div><router-outlet />`
})
export class App { progress = signal(0); constructor() { addEventListener('scroll', () => { const max = document.documentElement.scrollHeight - innerHeight; this.progress.set(max ? scrollY / max * 100 : 0); }, { passive: true }); } }
