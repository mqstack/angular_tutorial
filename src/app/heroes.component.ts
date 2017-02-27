import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './model/hero';
import { HeroService } from './service/hero.service';

@Component({
	moduleId: module.id,
	selector: 'my-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.scss'],
	providers: [HeroService]
})
export class HeroesComponent implements OnInit {
	heroes: Hero[];
	selectHero: Hero;

	constructor(private router: Router,
		private heroService: HeroService) {

	}

	ngOnInit(): void {
		this.getHeroes();
	}

	getHeroes(): void {

		this.heroService.getHeroesSlowly().then(heroes => {
			this.heroes = heroes;
			console.log("Get heroes called" + heroes);
		});
	}

	onSelect(hero: Hero): void {
		this.selectHero = hero;
	}

	gotoDetail(): void {
		this.router.navigate(['/detail', this.selectHero.id]);
	}

	addHero(name: string): void {
		name = name.trim();
		if (!name) return;
		this.heroService.create(name)
			.then(hero => {
				this.heroes.push(hero);
				this.selectHero = null;
			});
	}

	deleteHero(hero: Hero): void {
		this.heroService.delete(hero.id)
			.then(() => {
				this.heroes = this.heroes.filter(h => h != hero);
				if (this.selectHero === hero) {
					this.selectHero = null;
				}
			});
	}
}