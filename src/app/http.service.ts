import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	private API = 'https://pixabay.com/api/?key=11863427-94c4daac966e6accaf134b1a6&per_page=200&orientation=horizontal&image_type=photo&min_width=600&min_height=600';

	constructor(private http: HttpClient) { }

	getImages() {
		return this.http.get(this.API);
	}
}
