import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
      >
  `,
})
export class SearchBoxComponent {

  private gifsServices = inject(GifsService);

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;


  searchTag() {

    const newTag = this.tagInput.nativeElement.value;

    this.gifsServices.searchTag(newTag);
    this.tagInput.nativeElement.value = '';

  }

}
