import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  images = [
    '../../assets/login/slide_speaker.png',
    '../../assets/login/slide_console.png',
    '../../assets/login/slide_phone.png'
  ];
  title: string = "";

  constructor() {}

  ngOnInit() {
    this.title = JSON.parse(localStorage.getItem('theme')).properties.name;
    // Add smooth scrolling to all links
    $('a').on('click', function(event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this['hash'] !== '') {
        // Prevent default anchor click behavior
        event.preventDefault();
        // Store hash
        var hash = this['hash'];
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate(
          {
            scrollTop: $(hash).offset().top
          },
          800
        );
      } // End if
    });
  }
  createAccount(event: Event) {
    event.preventDefault()
  }
}
