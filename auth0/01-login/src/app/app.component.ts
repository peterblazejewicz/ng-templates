import { AuthService } from './auth/auth.service';
import { ElementRef, Renderer, Component, OnInit } from '@angular/core';

@Component({
  selector: 'auth0-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  nativeElement: Node;
  constructor(public auth: AuthService,
    elem: ElementRef, private renderer: Renderer) {
    this.nativeElement = elem.nativeElement;
  }


  ngOnInit(): void {
    if (this.nativeElement) {
      this.renderer.setElementAttribute(this.nativeElement, 'unresolved', null);
    }
  }
}
