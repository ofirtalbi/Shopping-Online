
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

  navigate(destination) {
    this.router.navigateByUrl("/" + destination)

  }


  ngOnInit(): void {

  }

}
