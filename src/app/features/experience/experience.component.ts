import { Component } from '@angular/core';
import { EXPERIENCE } from '../../data/experience'; 

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [], 
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  experiences = EXPERIENCE;
}