import { Component, ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google : any;
declare var geolib: any;
/**
 * Generated class for the LocalizacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-localizacao',
  templateUrl: 'localizacao.html',
})
export class LocalizacaoPage {
@ViewChild ('map') mapRef: ElementRef;
map:any;
item :any;
endereco:any;

  constructor(private geolocation: Geolocation,public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
     this.item = this.navParams.get('item');
     console.log(this.item.latitude);
  }


  private loadMap(){

  }
  close(){
    this.viewCtrl.dismiss();
  }
  private calcRoute(lat, long){
    let directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(this.map);

    let origin = new google.maps.LatLng(lat, long);
    let destination = new google.maps.LatLng(this.item.latitude, this.item.longitude);

    let directionsService = new google.maps.DirectionsService();
    var params = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(params, (result, status)=>{
      directionsRenderer.setDirections(result);

      this.getAddress(destination, result=>{

        this.endereco = result;
          console.log(this.endereco);
      })
    })
  }


  private getAddress(latLng, successCallback){
    let geocoder = new google.maps.Geocoder;
    geocoder.geocode({
       location:latLng}
       ,(results, status)=>{
         console.log(results);
         successCallback(results[0].formatted_address);

    })

  }


  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then(resp=>{
      let mapOptions = {
        zoom:19,
       mapTypeId: 'roadmap',
       disableDefaultUI: true,
       styles: [
           {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
           {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
           {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
           {
             featureType: 'administrative.locality',
             elementType: 'labels.text.fill',
             stylers: [{color: '#d59563'}]
           },
           {
             featureType: 'poi',
             elementType: 'labels.text.fill',
             stylers: [{color: '#d59563'}]
           },
           {
             featureType: 'poi.park',
             elementType: 'geometry',
             stylers: [{color: '#263c3f'}]
           },
           {
             featureType: 'poi.park',
             elementType: 'labels.text.fill',
             stylers: [{color: '#6b9a76'}]
           },
           {
             featureType: 'road',
             elementType: 'geometry',
             stylers: [{color: '#38414e'}]
           },
           {
             featureType: 'road',
             elementType: 'geometry.stroke',
             stylers: [{color: '#212a37'}]
           },
           {
             featureType: 'road',
             elementType: 'labels.text.fill',
             stylers: [{color: '#9ca5b3'}]
           },
           {
             featureType: 'road.highway',
             elementType: 'geometry',
             stylers: [{color: '#746855'}]
           },
           {
             featureType: 'road.highway',
             elementType: 'geometry.stroke',
             stylers: [{color: '#114692'}]
           },
           {
             featureType: 'road.highway',
             elementType: 'labels.text.fill',
             stylers: [{color: '#ccc'}]
           },
           {
             featureType: 'transit',
             elementType: 'geometry',
             stylers: [{color: '#114692'}]
           },
           {
             featureType: 'transit.station',
             elementType: 'labels.text.fill',
             stylers: [{color: '#d59563'}]
           },
           {
             featureType: 'water',
             elementType: 'geometry',
             stylers: [{color: '#17263c'}]
           },
           {
             featureType: 'water',
             elementType: 'labels.text.fill',
             stylers: [{color: '#515c6d'}]
           },
           {
             featureType: 'water',
             elementType: 'labels.text.stroke',
             stylers: [{color: '#17263c'}]
           }
         ]
      };
      let mapDiv = document.getElementById('map');
      this.map = new google.maps.Map(mapDiv, mapOptions);
      this.calcRoute(resp.coords.latitude, resp.coords.longitude);

    });

  }

private geoDist(origin, destination){
  let distance = geolib.getDistance(origin, destination);

}
private getalldist(lat, long){
  console.log(geolib.convertUnit('km',geolib.getDistanceSimple(
    {latitude: -14.8641461, longitude:-40.8240219},
    {latitude: lat, longitude: long}
), 2));

}

  showMap(lat, long){
let LatLng = new google.maps.LatLng(lat,long);
let mapOptions = {
  center: LatLng,
  zoom: 15,

};
let element = document.getElementById('map');
let map = new google.maps.Map(element, mapOptions );
let marker = new google.maps.Marker({
  position: LatLng
});

marker.setMap(map);
  }

}
