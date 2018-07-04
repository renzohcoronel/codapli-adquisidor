import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-lecturas',
  templateUrl: './lecturas.component.html',
  styleUrls: ['./lecturas.component.css']
})
export class LecturasComponent implements OnInit {

  socket: any;
  celda:any;
  lvdt0:any;
  lvdt1:any;
  constructor() { }

  ngOnInit() {

    this.socket = socketIo(`http://localhost:5001`);
    this.socket.on('arduino:setting', function (data) {
      
      this.celda = data.celda;
      this.lvdt0 = data.ldvt0;
      this.lvdt1 = data.lvdt1;

    }.bind(this));
  }

}
