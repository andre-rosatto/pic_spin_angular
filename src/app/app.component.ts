import { NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { DiscComponent, DiscInfo } from './disc/disc.component';
import { HttpService } from './http.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		NgStyle,
		DiscComponent,
		NgFor
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	title = 'Pic Spin';
	tiers = 5;
	discs: DiscInfo[] = [];
	width?: number;
	image?: string;

	constructor(private httpService: HttpService) { }

	ngOnInit() {
		for (let i = 0; i < this.tiers; i++) {
			this.discs.push({
				tier: i,
				tierCount: this.tiers,
				image: '',
				gameWidth: this.width,
				rotation: 0,
				status: ''
			})
		}
		addEventListener('resize', () => this.onWindowResize());
		this.startLevel();
		this.onWindowResize();
	}

	startLevel() {
		this.httpService.getImages().subscribe(res => {
			const data = res as { hits: { largeImageURL: string }[] };
			const picURL = data.hits[Math.floor(Math.random() * data.hits.length)].largeImageURL;
			this.image = `url(${picURL})`;
			for (let disc of this.discs) {
				disc.image = this.image;
				disc.status = '';
			}
			setTimeout(() => {
				for (let disc of this.discs) {
					disc.rotation = Math.floor(Math.random() * 64 - 32);
					disc.status = 'enabled';
				}
			}, 1000);
		});
	}

	showNext() {
		const next = document.querySelector('#next') as HTMLDivElement;
		next.className = 'show';
	}

	onDiscRotate() {
		if (this.discs.some(disc => disc.rotation % 8 !== 0 || disc.status === '')) return;
		this.discs.forEach(disc => disc.status = 'complete');
		this.showNext();
	}

	onNextClick(e: MouseEvent) {
		(e.target as HTMLDivElement).className = 'hide';
		setTimeout(() => (e.target as HTMLDivElement).className = '', 200);
		this.startLevel();
	}

	onWindowResize() {
		const viewportWidth = document.documentElement.clientWidth;
		this.width = Math.min(viewportWidth * 0.9, 600);
		for (let disc of this.discs) {
			disc.gameWidth = this.width;
		}
	}
}
