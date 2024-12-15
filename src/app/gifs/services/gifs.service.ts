import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {


    public gifList:Gif[] = []; //

    private _tagsHistory: string[] = [];
    private apiKey:     string = '2XKZ4daceBh2EgpNyOIpLEKFNZAYHy9n';
    private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

    private http = inject(HttpClient)

    constructor() {
        this.loadLocalStorage();
     }

    get tagsHistory() {
        return [...this._tagsHistory];
    }

    private organizeHistory(tag: string) {
        tag = tag.toLowerCase();

        if (this._tagsHistory.includes(tag)) {
            this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
        }

        this._tagsHistory.unshift(tag);
        this._tagsHistory = this._tagsHistory.splice(0,10);

        this.saveLocalStorage();
    }
    
    private saveLocalStorage(): void{
        localStorage.setItem('history', JSON.stringify(this._tagsHistory));
    }

    private loadLocalStorage(): void{
        if(!localStorage.getItem('history')) return
        const history = JSON.parse(localStorage.getItem('history')!);
        this._tagsHistory = history;

        if(this._tagsHistory.length === 0)  return;
        this.searchTag(this._tagsHistory[0]);
    }
    
     searchTag( tag:string ):void {
    // async searchTag( tag:string ):Promise<void> {

        if(tag.length === 0 ) return;
        this.organizeHistory(tag);

        // fetch('https://api.giphy.com/v1/gifs/search?api_key=2XKZ4daceBh2EgpNyOIpLEKFNZAYHy9n&q=valorant&limit=10')
        //     .then(resp => resp.json())
        //     .then(data => console.log(data));

        // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=2XKZ4daceBh2EgpNyOIpLEKFNZAYHy9n&q=valorant&limit=10');
        // const data = await resp.json();
        // console.log(data);

        const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', tag)
        ;

        this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params } )
            .subscribe(resp => {
                this.gifList = resp.data;
            })
    }
}