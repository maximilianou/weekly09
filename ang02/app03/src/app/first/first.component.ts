import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {

  text: string = 'Hi, App running.';

  numbers: number[] =  [23, 45, 67, 24, 92, 10];

  isGreen: boolean = true;

  cash: number = 1.99;

  date = new Date();

  isDisabled: boolean = false;

  onClick(){
    console.log('Button has clicked');
  }

  constructor() { }

  ngOnInit(): void {
  }

}
