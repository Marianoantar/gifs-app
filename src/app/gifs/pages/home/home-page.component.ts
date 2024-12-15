import { Component, inject } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  private gifsService = inject(GifsService)

  constructor(){}

  get gifs(): Gif[] {
    return this.gifsService.gifList;
  }

}
