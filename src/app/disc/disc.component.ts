import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface DiscInfo {
	tier: number;
	tierCount: number;
	image?: string;
	gameWidth?: number;
	rotation: number;
	status: '' | 'enabled' | 'complete';
}

@Component({
	selector: 'app-disc',
	standalone: true,
	imports: [NgStyle],
	templateUrl: './disc.component.html',
	styleUrl: './disc.component.css'
})
export class DiscComponent {
	width?: number;
	top?: number;
	left?: number;
	@Input() info?: DiscInfo;
	@Output() rotate = new EventEmitter();

	ngOnInit() {
		addEventListener('resize', () => this.onWindowResize());
		this.onWindowResize();
	}

	onClick(e: MouseEvent) {
		const parent = (e.target as HTMLDivElement).offsetParent as HTMLDivElement;
		const midPoint = parent.offsetLeft + parent.offsetWidth / 2;
		const inc = e.clientX > midPoint ? 1 : -1;
		this.info!.rotation += inc;
		this.rotate.emit();
	}

	onWindowResize() {
		if (!this.info) return;
		const offset = 100 / this.info.tierCount;
		this.width = 100 - this.info.tier * offset;
		this.left = this.top = this.info.tier * offset / 2;
	}
}
