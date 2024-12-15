import { Component, inject } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

private gifsService = inject(GifsService);
// public tags = this.gifsService.tagsHistory;

get tags(): string[] {
  return this.gifsService.tagsHistory;
}

search (tag: string): void{
  this.gifsService.searchTag(tag);

}

}
