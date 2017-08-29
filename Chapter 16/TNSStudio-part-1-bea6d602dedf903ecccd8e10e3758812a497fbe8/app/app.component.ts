// angular
import { Component } from '@angular/core';

// app
import { AuthService } from './modules/core/services/index';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
})
export class AppComponent {

    constructor(private authService: AuthService) { }

    public counter: number = 16;

    public get message(): string {
        if (this.counter > 0) {
            return this.counter + ' taps left';
        } else {
            return 'Hoorraaay! \nYou are ready to start building!';
        }
    }
    
    public onTap() {
        this.counter--;
    }
}
