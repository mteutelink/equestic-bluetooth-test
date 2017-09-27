import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import { BluetoothService } from "../../app/services/bluetooth.service"

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [ BluetoothService ]
})
export class HomePage {

    constructor(public navCtrl: NavController, public _bluetoothService: BluetoothService) {

    }

    click() {
        this._bluetoothService.connect();
    }
}
