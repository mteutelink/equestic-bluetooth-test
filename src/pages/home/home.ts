import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DevicePage} from '../device/device';
import { BLE } from '@ionic-native/ble';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [ BLE ]
})
export class HomePage {

    devices;
    isScanning = false;

    constructor(public nav: NavController, private ble: BLE) {
        this.devices = [];
        this.isScanning = false;
    }

    startScanning() {
        console.log("Scanning Started");
        this.devices = [];
        this.isScanning = true;
        this.ble.startScan([]).subscribe(device => {
            this.devices.push(device);
        });

        setTimeout(() => {
            this.ble.stopScan().then(() => {
                console.log('Scanning has stopped');
                console.log(JSON.stringify(this.devices));
                this.isScanning = false;
            });
        }, 3000);

    }

    connectToDevice(device) {
        console.log('Connect To Device');
        console.log(JSON.stringify(device))
        this.nav.push(DevicePage, {
            device: device
        });
    }

}
