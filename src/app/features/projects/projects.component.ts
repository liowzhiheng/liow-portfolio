import { Component } from '@angular/core';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { PROJECTS } from '../../data/project';
import { CommonModule } from '@angular/common';
imports:[
CommonModule,
ProjectCardComponent

]
@Component({

selector:'app-projects',

standalone:true,

imports:[

ProjectCardComponent

],

templateUrl:'./projects.component.html',

styleUrl:'./projects.component.scss'

})

export class ProjectsComponent {


projects = PROJECTS;


}