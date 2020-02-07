import { Component, OnInit } from '@angular/core';
import TransportService from '../../services/transport.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  constructor(private readonly transport: TransportService) { }

  ngOnInit() {
    this.transport.getStat().subscribe(r => console.log(r));
  }

}
