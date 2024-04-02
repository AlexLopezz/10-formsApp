import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';


@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
 
  @ViewChild('map') divMap?:ElementRef;
  public map?: Map;
  public zoom:number= 12;
  public currentCenter:LngLat = new LngLat( -58.932, -27.486 );

  ngAfterViewInit(): void {
    if(!this.divMap) throw 'Element HTML not found';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }
  ngOnDestroy(): void { this.map?.remove(); }

  mapListeners() {
    if(!this.map) throw 'Map not found';

    this.map.on('zoom', ()=> {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', () => {
      if(this.map!.getZoom() < 18) return;

      this.map?.zoomTo(18);
    })

    this.map.on('move', ()=> {
      this.currentCenter =this.map!.getCenter();
    })


  }
  onZoomChanged( value:string ){
    this.zoom = Number.parseInt(value);
    this.map?.zoomTo(this.zoom);
  }
  onZoomIn():void { this.map?.zoomIn(); }
  onZoomOut():void { this.map?.zoomOut(); }
}
