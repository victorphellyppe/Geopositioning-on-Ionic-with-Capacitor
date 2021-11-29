import { Component, NgZone } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  coordinate:any;
  watchCoordinate:any;
  whatchId: any;

  constructor(private ngZone: NgZone) {}

  async requestPermission(){
    const permissionResult = await Geolocation.checkPermissions();
    console.log('Permissão requisitada ? ', permissionResult);
    return; 
  } //metodo 1
  getCurrentCoordinate(){
    if(!Capacitor.isPluginAvailable('Geolocation')){
      console.log('Permissão não foi aceita');
      return;      
    }
    Geolocation.getCurrentPosition().then((data) => {
      this.coordinate = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
        accuracy: data.coords.accuracy
      };
    }).catch(erro => {
      console.error('Deu erro : ', erro);  
    });
  } //metodo 2


  whatchPosition(){
    try {
      this.whatchId = Geolocation.watchPosition({}, (position, err) => {
        console.log('Watch ' ,position);
        this.ngZone.run(() => {
          this.watchCoordinate = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,            
          };
        });        
      }); 
    } catch (error) {
      console.error(error);
    }
  }//metodo 3

  clearWatch(){
    if(this.whatchId != null){
      Geolocation.clearWatch({ id:this.whatchId });
    }
  } //metodo 4
}
