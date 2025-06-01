import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { JwtService } from './services/jwt/jwt.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'order-ui';

  constructor(private jwtService: JwtService) {}

  ngOnInit() {
    this.jwtService.fetchAndStoreToken();
  }
} 