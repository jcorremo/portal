import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ApiService } from 'src/app/services/api.service';
import { JSEncrypt } from 'jsencrypt';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
  loading = false;
  data: any;
  cartItems = [];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.data = JSON.parse(sessionStorage.getItem('shipData'));
    this.cartItems = JSON.parse(sessionStorage.getItem('cart')).items;
  }

  pay() {
    this.loading = true;

    // Set data
    const items = this.cartItems.map(item => ({
      id: item.idProduct,
      price: item.price,
      qt: 1
    }));
    const { address, num1, num2, num3 } = this.data;
    const shipTo = `${address} ${num1} NO ${num2} - ${num3}`;

    // Encrypt
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(
      `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0OdUwYV8HlIdWUS80FaAuMzTctc4aHYVea0r51IDah1Y0cWk4hLR7KDDXxGe2HY/5BJ1McpZdtoAdXoL27ysj5nFiJ+7IS8yvBlkW3eveCrFrLfzruNuiZSNiwWu9Uh9A3uLx15TvF/VXbrchhruFkoERmKaOCFNHpoTdU0uqATfIPQ24SJQJ4BTaNVy3X3impubrEkREbPHpRH7VtSNnOTTNPySPgD6pWSmk4LeDJtYkPOaHNe2VBseznQZ03t/5loFjq/z5NgZy120/se8oEWQBmUorECzKN7IqJuolWP9M6CSQM+eLyTOz0ueXcvs9Sb8D9JKciIpF0WtiZA+6QIDAQAB`
    );
    const encryptedEmail = encrypt.encrypt('juanes1183@gmail.com');
    const encryptedAddress = encrypt.encrypt(shipTo);

    // Params
    const params = {
      createAt: new Date(),
      email: encryptedEmail,
      items: items,
      shipTo: encryptedAddress
    };
    // console.log(params);

    // Decrypt
    // const decrypt = new JSEncrypt();
    // decrypt.setPrivateKey(
    //   `MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQ51TBhXweUh1ZRLzQVoC4zNNy1zhodhV5rSvnUgNqHVjRxaTiEtHsoMNfEZ7Ydj/kEnUxyll22gB1egvbvKyPmcWIn7shLzK8GWRbd694KsWst/Ou426JlI2LBa71SH0De4vHXlO8X9VdutyGGu4WSgRGYpo4IU0emhN1TS6oBN8g9DbhIlAngFNo1XLdfeKam5usSRERs8elEftW1I2c5NM0/JI+APqlZKaTgt4Mm1iQ85oc17ZUGx7OdBnTe3/mWgWOr/Pk2BnLXbT+x7ygRZAGZSisQLMo3siom6iVY/0zoJJAz54vJM7PS55dy+z1JvwP0kpyIikXRa2JkD7pAgMBAAECggEBALjB/9nwHugKI97RxlRUTSAkN1a4NjFdTn0AxXWeuVpefjF5Jey0TGmFfYVVZjF30+X41SGmHx3YjNNZj6dV5SBUFbpR2wTsY2is5G9pGQ2kdpPdVW31w8t2UQEFk8lnxPkRiXxYVqKh92kgXO1WX//ikolVp6PBAB3ykwcJrhv2J+Y5OJFyPO1aw4i+XO27gvs+Cbg5gUcNno3vFlXPopTKRbXk4J6zNlKG3ieV3yBsbqt3qI6Z0c/e4eqgyX3qL1xrg1UDvdDcdygtoq4nDLjGhYLA0Fu9SB+fDuW7IyK2dvA344Mc7CbzqtpzWZrNyWP3p3c7t5PTghtA5DOIJwECgYEA/8SkjxQDkOvtylRdIbH6oEXjKQ/xoXQUTeSczYQz8LpmXw+6cesKbHirAbKhbnzC2Z1/cFa/qEzUgSmtdobftHr/Wvy5oUwVCjZS7VMmlb+ouhl94mBKy3Av7uzk+T34o+nU0JTeBJ2HfdPiE8tDhFcqG0hr6k0P6GWUolb1tVkCgYEA0RfP7iNx8mf/LpoVhGl1kHDuBtVkEeZlq/Zwp7Xkft33rkJzM8Sof8lKnUec1Sl8i2OJ+0PTmCX+yKNJ78aHOZGgFH0jHzFSaKVxMvqr9cYAQ0koYWdmC6JJAh2vNUPR4RkupbfrfYzGTdY9k812hS0wmZY6ZkJv/iYg8oPuVBECgYEAt5ur4oaklLm5p8DuZo0E9V+WVlj6xkO1e8F9C1A3lT3K1b1NxA/OGNZ7NKnOl6l6m4wj+zpbNe+JsfuAahEisMaHYAMDI5ahmAYte+9wSJog/w/jvcoQh4DO+D8ZlQ922fy36NClnTyVErAzoLAPlQaZ1KIlzjpqDBQ4Il4432kCgYB8G9o7y6Yy8C+zhZoIAmDZ324peDfxuAPZUmoD4h9CfpYpRSAENlKdpuk2+e7JR9q5Edgw4E2UHdlhVirou7pAHYQbJTvXo/r6SlkqnUe8lk5Jof7p8enMNgOH0f7RavQE3GGn08dfulNqmCPsuyQCYJRcVaNMV1sKS696w3yPQQKBgGLA9wy0NAVzKL+TrKQpXAM1mpVVqfRn2xUEUx+kxQu8zBwU3jvftZCG6AeseXtAVAD9WuJY06odKXqrYkwN1AfYMXO7hLBXxUbrvoomZ0hY9b2wQ015tMqZWNOAg+SxrJbAaKkPHYPJsDM5gdi4xuq8fA10/pTX1fn0W044V/4W`
    // );
    // const decryptedEmail = decrypt.decrypt(encryptedEmail);
    // const decryptedAddress = decrypt.decrypt(encryptedAddress);
    // console.log(`${decryptedEmail}, ${decryptedAddress}`);

    this.apiService.sendOrder(params).subscribe(
      (res: any) => {
        sessionStorage.setItem('shipId', res.uid);
        setTimeout(() => this.navigate(), 3000);
      },
      error => console.log(error)
    );
  }

  navigate() {
    this.router.navigate(['/cart/step-3']);
  }
}
