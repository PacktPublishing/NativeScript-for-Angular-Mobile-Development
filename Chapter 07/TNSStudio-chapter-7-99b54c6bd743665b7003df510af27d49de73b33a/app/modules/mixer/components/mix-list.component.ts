// angular
import { Component } from '@angular/core';

// app
import { MixerService } from '../services/mixer.service';

@Component({
  moduleId: module.id,
  selector: 'mix-list',
  templateUrl: 'mix-list.component.html'
})
export class MixListComponent {

  constructor(public mixerService: MixerService) { }  
}
