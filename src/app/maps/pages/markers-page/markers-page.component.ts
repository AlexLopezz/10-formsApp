import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';


interface CustomMarker {
  color: string;
  marker: Marker;
}
interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit{
  @ViewChild('map') divMap?:ElementRef;
  public map?: Map;
  public zoom:number= 12;
  public currentCenter:LngLat = new LngLat( -58.932, -27.486 );
  public markers:CustomMarker[] = [];


  ngAfterViewInit(): void {
    if(!this.divMap) throw 'Element HTML not found';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: 14,
    });

    // new Marker({ color: 'red' })
    //   .setLngLat(this.currentCenter)
    //   .addTo(this.map);

    this.loadFromLocalStorage();
  }

  createMarker() {
    const color:string = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lng:LngLat = this.map!.getCenter();
    
    this.addMarker( lng , color);
  }

  addMarker( lng:LngLat, color:string='red' ){
    if(!this.map) return;

    const marker:Marker= new Marker(
      { color: color, draggable: true }
    )
    .setLngLat(lng)
    .addTo(this.map);

    
    
    this.markers.push({ color, marker });
    this.saveToLocalStorage();
    marker.on('dragend', ()=> this.saveToLocalStorage());

  }

  deleteMarker( index:number ):void {
    this.markers[index].marker.remove();
    this.markers.splice( index, 1 );
    this.saveToLocalStorage();
  }

  goTo( marker:Marker ):void {
    this.map?.flyTo({ 
      zoom: 14, 
      center: marker.getLngLat() 
    });
  }

  saveToLocalStorage() {
    const plainMarkers:PlainMarker[] = this.markers
      .map( ({ color, marker }) => { 
        return {
          color: color,
          lngLat: marker.getLngLat().toArray()
        }
      });

    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ) );
  }
  loadFromLocalStorage() {
    const plainmarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarker:PlainMarker[] = JSON.parse(plainmarkersString);
    
    plainMarker.forEach( ({ color, lngLat })=> {
      const [ lng, lat ] = lngLat;
      this.addMarker( new LngLat(lng, lat), color );
    });
  }
}
