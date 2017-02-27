import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Hero } from '../model/hero';

@Injectable()
export class HeroSearchService {

	private baseUrl = 'app/heroes/';

	constructor(private http: Http) { }

	search(term: string): Observable<Hero[]> {
		return this.http.get(`${this.baseUrl}?name=${term}`)
			.map(response => response.json().data as Hero[]);
	}
}