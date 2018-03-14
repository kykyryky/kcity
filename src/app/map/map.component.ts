import { Component, OnInit } from '@angular/core';
import { latLng, LatLng, tileLayer, marker, icon } from 'leaflet';
import { ContentService } from '../service/content.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit { 
	constructor(private contentService: ContentService) { }

	ngOnInit() {
		let i = 0.001;
		this.contentService.list()
		.subscribe((topics) => {
			for (const topic of topics) {

				
				this.layers.push(
					marker(
						[parseFloat(topic.coords[0]), parseFloat(topic.coords[1])],
						{
							icon: icon({
								iconSize: [ 25, 25 ],
								iconUrl: 'assets/marker.png'
							})
						}
					).bindPopup(`<img src="image/${topic.files && topic.files[0]}">`)
					.openPopup()		
				);
			}		  
		})
	}

	layers = [];

	options = {
		layers: [
			tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
		],
		zoom: 17,
		center: latLng(59.8813, 30.9872)
	};
}
