import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.page.html',
  styleUrls: ['./slide.page.scss'],
})
export class SlidePage implements OnInit {

  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() {
    this.storage.set('firstco', true)
  }
  redirection(){
    

    this.router.navigate(['folder']);
  }
}
