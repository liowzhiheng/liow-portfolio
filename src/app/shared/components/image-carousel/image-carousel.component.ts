import {Component,Input} from '@angular/core';


@Component({

selector:'app-image-carousel',

standalone:true,

templateUrl:
'./image-carousel.component.html',

styleUrl:
'./image-carousel.component.scss'

})

export class ImageCarouselComponent {


@Input()
images:string[]=[];


current=0;


next(){

this.current =
(this.current+1)%this.images.length;

}


previous(){

this.current =
(this.current-1+this.images.length)
%this.images.length;

}


}