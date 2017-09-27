import {
    Injectable
} from "@angular/core";

@Injectable()
export class BluetoothService {
    constructor() {
    }

    connect() {
        alert("CONNECT");
    }
}
