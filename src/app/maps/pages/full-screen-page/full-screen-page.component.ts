import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
(mapboxgl as any).accessToken = 'pk.eyJ1IjoiYWxleGRldnYiLCJhIjoiY2x1aDRzOGRnMmtpdTJpcHF6MXdnbXYwNCJ9.ZuyeLdaoE-Cwf_8c7Z8IrQ';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?:ElementRef;
  
  ngAfterViewInit(): void {
    if(!this.divMap) throw 'Element HTML not found';

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

}
