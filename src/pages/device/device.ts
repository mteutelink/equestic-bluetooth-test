import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
// import {CharacteristicPage} from '../characteristic/characteristic';
import { BLE } from '@ionic-native/ble';

@Component({
    selector: 'page-device',
    templateUrl: 'device.html',
    providers: [ BLE ]
})

export class DevicePage {

    private static DATA_SERVICE =        'F000AA80-0451-4000-B000-000000000000';
    private static DATA_DATA =           'F000AA81-0451-4000-B000-000000000000';
    private static DATA_CONFIGURATION =  'F000AA82-0451-4000-B000-000000000000';

    device;
    connecting = false;
    characteristics;
    count = 0;

    constructor(public navParams: NavParams,public nav: NavController, private ble: BLE) {
        this.device = this.navParams.get('device');
        this.connecting = true;
        this.connect(this.device.id);
    }

    connect(deviceID) {
        this.characteristics = [];

        this.ble.connect(deviceID).subscribe(peripheralData => {
                console.log(peripheralData.characteristics);
                this.characteristics = peripheralData.characteristics;
                this.connecting = false;

                // Notifications
                this.ble.startNotification(deviceID, DevicePage.DATA_SERVICE, DevicePage.DATA_DATA).subscribe(data => {
                    this.count++;
                    console.log(this.count);
                }, error => {
                    console.log(error);
                });

                let mask = 56 | 7 | 256 | 0;
                let buffer = new ArrayBuffer(2);
                let view = new DataView(buffer);
                view.setUint16(0, mask, true);
                this.ble.write(deviceID, DevicePage.DATA_SERVICE, DevicePage.DATA_CONFIGURATION, buffer).then(reply => {
                    console.log(reply);
                }).catch(error => {
                    console.log(error);
                })

            },
            peripheralData => {
                console.log('disconnected');
            });
    }

    disconnect() {
        this.ble.disconnect(this.device.id);
    }

    connectToCharacteristic(deviceID,characteristic) {
        console.log('Connect To Characteristic');
        console.log(deviceID);
        console.log(characteristic);
    }

}
