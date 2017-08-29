// angular
import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  moduleId: module.id,
  selector: 'record',
  templateUrl: 'record.component.html'
})
export class RecordComponent { 

  constructor(private router: RouterExtensions) { }

  public back() {
    this.router.back();
  }
}
