import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from '../service/hero-search.service';
import { Hero } from '../model/hero';

@Component({
	moduleId: module.id,
	selector: 'hero-search',
	templateUrl: './hero-search.component.html',
	styleUrls: ['hero-search.component.scss'],
	providers: [HeroSearchService]
})

export class HeroSearchComponent implements OnInit {

	private heroes: Observable<Hero[]>;
	private searchItems = new Subject<string>();

	constructor(private router: Router,
		private heroService: HeroSearchService) { }

	ngOnInit(): void {
		this.heroes = this.searchItems
			.debounceTime(300)
			.distinctUntilChanged()
			.switchMap(term => term ? this.heroService.search(term)
				: Observable.of<Hero[]>([]))
			.catch(error => {
				console.log('Error', error);
				return Observable.of<Hero[]>([]);
			})
	}

	search(name: string) {
		this.searchItems.next(name);
	}

	gotoDetail(hero: Hero) {
		this.router.navigate(['/detail', hero.id]);
	}
}