import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Hero } from '../model/hero';
import { HEROES } from './mock-heros';

@Injectable()
export class HeroService {

	private heroUrl = 'api/heroes';
	private headers = new Headers({ 'Content-Type': 'application/json' });

	constructor(private http: Http) {

	}

	getHeroes(): Promise<Hero[]> {
		return this.http.get(this.heroUrl)
			.toPromise()
			.then(response => response.json().data as Hero[])
			.catch(this.handleError);
	} //stub

	private handleError(error: any): Promise<any> {
		console.error("Get heroes error", error);
		return Promise.reject(error.message || error);
	}

	getHeroesSlowly(): Promise<Hero[]> {
		return new Promise(resolve => {
			// Simulate server latency with 2 second delay
			setTimeout(() => resolve(this.getHeroes()), 200);
		});
	}

	getHero(id: number): Promise<Hero> {
		return this.http.get(`${this.heroUrl}/${id}`)
			.toPromise()
			.then(response => response.json().data as Hero)
			.catch(this.handleError);
	}

	update(hero: Hero): Promise<Hero> {
		const url = `${this.heroUrl}/${hero.id}`;

		return this.http.put(url, JSON.stringify(hero), { headers: this.headers })
			.toPromise()
			.then(() => hero)
			.catch(this.handleError);
	}

	create(name: string): Promise<Hero> {
		return this.http.post(this.heroUrl, JSON.stringify({ name: name }), { headers: this.headers })
			.toPromise()
			.then(res => res.json().data)
			.catch(this.handleError);
	}

	delete(id: number): Promise<any> {
		return this.http.delete(`${this.heroUrl}/${id}`)
			.toPromise();
	}
}