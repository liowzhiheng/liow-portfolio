import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PROJECTS } from '../../data/project';
import { Project } from '../../core/models/project';
import { CommonModule } from '@angular/common';
import { ImageCarouselComponent } from '../../shared/components/image-carousel/image-carousel.component';

@Component({

  selector: 'app-project-detail',

  standalone: true,
  imports: [
    CommonModule,
    [ImageCarouselComponent]
  ],

  templateUrl: './project-detail.component.html',

  styleUrl: './project-detail.component.scss'

})

export class ProjectDetailComponent {


  project?: Project;


  constructor(
    private route: ActivatedRoute
  ) { }



  ngOnInit() {


    const id =
      this.route.snapshot.paramMap.get('id');


    this.project =
      PROJECTS.find(
        p => p.id === id
      );


  }


}