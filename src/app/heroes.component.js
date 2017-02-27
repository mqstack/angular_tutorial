"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var hero_service_1 = require('./service/hero.service');
var HeroesComponent = (function () {
    function HeroesComponent(router, heroService) {
        this.router = router;
        this.heroService = heroService;
    }
    HeroesComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    HeroesComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService.getHeroesSlowly().then(function (heroes) {
            _this.heroes = heroes;
            console.log("Get heroes called" + heroes);
        });
    };
    HeroesComponent.prototype.onSelect = function (hero) {
        this.selectHero = hero;
    };
    HeroesComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectHero.id]);
    };
    HeroesComponent.prototype.addHero = function (name) {
        var _this = this;
        name = name.trim();
        if (!name)
            return;
        this.heroService.create(name)
            .then(function (hero) {
            _this.heroes.push(hero);
            _this.selectHero = null;
        });
    };
    HeroesComponent.prototype.deleteHero = function (hero) {
        var _this = this;
        this.heroService.delete(hero.id)
            .then(function () {
            _this.heroes = _this.heroes.filter(function (h) { return h != hero; });
            if (_this.selectHero === hero) {
                _this.selectHero = null;
            }
        });
    };
    HeroesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-heroes',
            templateUrl: './heroes.component.html',
            styleUrls: ['./heroes.component.scss'],
            providers: [hero_service_1.HeroService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, hero_service_1.HeroService])
    ], HeroesComponent);
    return HeroesComponent;
}());
exports.HeroesComponent = HeroesComponent;
//# sourceMappingURL=heroes.component.js.map