import { Component, OnInit,Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() cityList: any[];
  unit: string;
  subscription: Subscription;
  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.subscription = this.stateService.getTempUnit().subscribe(
      res => {
        this.unit = res;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

}
