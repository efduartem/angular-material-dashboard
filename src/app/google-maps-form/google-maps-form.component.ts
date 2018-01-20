import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgModel, FormControl } from '@angular/forms';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

declare const google: any;

const url = 'https://apis.google.com/js/client.js?onload=__onGoogleLoaded'

@Component({
  selector: 'app-google-maps-form',
  templateUrl: './google-maps-form.component.html',
  styleUrls: ['./google-maps-form.component.scss']
})

export class GoogleMapsFormComponent implements OnInit {

  private street:String = "";
  private addressNumber: String = "";
  private city: String = "";
  private state: String = "";
  private country: String = "";
  private lat: Number = 0;
  private lng: Number = 0;


  loadAPI: Promise<any>
  constructor() {
    this.loadAPI = new Promise((resolve) => {
      window['__onGoogleLoaded'] = (ev) => {
        //console.log('gapi loaded', google)
        const autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocomplete"), {});
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
          var place = autocomplete.getPlace();
          //this.invokeEvent(place);
          this.addressNumber = "";
          this.street = "";
          this.city = "";
          this.state = "";
          this.country = "";
          console.log(place);
          for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            //console.log(addressType);
            switch (addressType) {
              case "street_number":
                this.addressNumber = place.address_components[i]["short_name"];
                break;
              case "route":
                this.street = place.address_components[i]["long_name"];
                break;
              case "locality":
                this.city = place.address_components[i]["long_name"];
                break;
              case "administrative_area_level_1":
                this.state = place.address_components[i]["short_name"];
                break;
              case "country":
                this.country = place.address_components[i]["long_name"];
                break;

            }

          }

          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
        });
        resolve({});
      }
      this.loadScript()
    });
  }

  doSomethingGoogley() {
    return this.loadAPI.then((gapi) => {
      console.log(google);
    });
  }

  loadScript() {
    //console.log('loading..')
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);

  }

  ngOnInit() {
    // const autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocomplete"), {});
    // google.maps.event.addListener(autocomplete, 'place_changed', () => {
    //   var place = autocomplete.getPlace();
    //   //this.invokeEvent(place);
    //   this.addressNumber = "";
    //   this.street = "";
    //   this.city = "";
    //   this.state = "";
    //   this.country = "";
    //   //console.log(place);
    //   for (var i = 0; i < place.address_components.length; i++) {
    //     var addressType = place.address_components[i].types[0];
    //     //console.log(addressType);
    //     switch (addressType){
    //       case "street_number":
    //         this.addressNumber = place.address_components[i]["short_name"];
    //         break;
    //       case "route":
    //         this.street = place.address_components[i]["long_name"];
    //         break;
    //       case "locality":
    //         this.city = place.address_components[i]["long_name"];
    //         break;
    //       case "administrative_area_level_1":
    //         this.state = place.address_components[i]["short_name"];
    //         break;
    //       case "country":
    //         this.country = place.address_components[i]["long_name"];
    //         break;
            
    //     }
        
    //   }
      
    //   this.lat = place.geometry.location.lat();
    //   this.lng = place.geometry.location.lng();
    // });
  }

}
