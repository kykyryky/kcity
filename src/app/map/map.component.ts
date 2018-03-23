import { Component, OnInit } from '@angular/core';
import { latLng, LatLng, tileLayer, marker, icon } from 'leaflet';
import { TopicService } from '../service/topic.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit { 
	constructor(private topicService: TopicService) { }
	ngOnInit() {
		let i = 0.001;
		this.topicService.list()
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
					).bindPopup(`<a href='#/page/${topic._id}'><img src="image/${topic.files && topic.files[0]}/resize/200/200"></a>`, {maxWidth : 350})							
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
