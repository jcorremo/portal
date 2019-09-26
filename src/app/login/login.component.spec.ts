import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CartComponent } from '../cart/cart.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { HomeComponent } from '../home/home.component';
import { ProductsComponent } from '../products/products.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { Step0Component } from '../cart/step0/step0.component';
import { Step1Component } from '../cart/step1/step1.component';
import { Step2Component } from '../cart/step2/step2.component';
import { Step3Component } from '../cart/step3/step3.component';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { CardComponent } from '../components/card/card.component';
import { ImagesCarouselComponent } from '../components/images-carousel/images-carousel.component';
import { CardHorizontalComponent } from '../components/card-horizontal/card-horizontal.component';
import { CardCategoryComponent } from '../components/card-category/card-category.component';
import { PrefooterComponent } from '../components/prefooter/prefooter.component';
import { CardProductComponent } from '../components/card-product/card-product.component';
import { CartProductComponent } from '../components/cart-product/cart-product.component';
import { StepsComponent } from '../components/steps/steps.component';
import { CartFormComponent } from '../components/cart-form/cart-form.component';
import { CartTotalComponent } from '../components/cart-total/cart-total.component';
import { PayMethodComponent } from '../components/pay-method/pay-method.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;
  let rootElement: HTMLElement;
  let loginButton: HTMLElement;
  let username: HTMLInputElement;
  let password: HTMLInputElement;
  let errorLabel: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CartComponent,
        LoginFormComponent,
        LoginComponent,
        HomeComponent,
        ProductsComponent,
        ProductListComponent,
        Step0Component,
        Step1Component,
        Step2Component,
        Step3Component,
        NavBarComponent,
        FooterComponent,
        CarouselComponent,
        CardComponent,
        ImagesCarouselComponent,
        CardHorizontalComponent,
        CardCategoryComponent,
        PrefooterComponent,
        CardProductComponent,
        CartProductComponent,
        StepsComponent,
        CartFormComponent,
        CartTotalComponent,
        PayMethodComponent,
        LoaderComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    rootElement = fixture.nativeElement;
    username = rootElement.querySelector('#username');
    password = rootElement.querySelector('#password');
    loginButton = rootElement.querySelector('#login-button');
    fixture.detectChanges();
  }));

  afterEach(() => {
    loginService = null;
    fixture = null;
    component = null;
    rootElement = null;
    loginButton = null;
    username = null;
    password = null;
    errorLabel = null;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('button disabled on empty input', () => {
    fixture.detectChanges();
    expect(loginButton.click()).toBeFalsy();
  });

  it('should login when credentials are ok', () => {
    // Mock the login service
    const apiResponse = {
      status : 'ok',
      jwt : 'eyJraWQiOiJ1bmlxdWUtaWRlbnRpZmllci1mb3ItcHJpdmF0ZWtleS1oZXJlIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhdmFsIiwiYXBpZ2VlLW9yZyI6ImV2ZXJpc3BvY2F2YWwtZXZhbCIsImFwaWdlZS1wcm94eSI6ImxvZ2luIiwiaXNzIjoidXJuOi8vYXBpZ2VlLWVkZ2UtSldULXBvbGljeS1kZW1vbnN0cmF0aW9uIiwicmVxdWVzdC1wYXRoIjoiL2xvZ2luL3JzMjU2LyIsIm1lc3NhZ2VpZCI6InJydC0zNjEwNzM3NTA1NjU5OTE2NTg4LWItZ2NlLTIxNjU3LTQ0NTIwOC02IiwiZXhwIjoxNTU2MjE3Mzc2LCJpYXQiOjE1NTYyMTAxNzYsImFwaWdlZS1lbnYiOiJwcm9kIiwianRpIjoiMTUzMDJkYzUtMWE2ZS00ZmRmLWJmMTQtMDM2M2E5NGZmMTQ0In0.nFX1WkSpAPFPZfgCo9SIxUQYNECYZYhUuxBO0LSHd5rJN09-AxxoLKltWSMlNICx1hljAt9hb6R0NSEXkymPsbbrHeYB8t0-v1-f5f2Trm7zaIcUeU8IG93dcpRoXQKHRKKU_SwBH2SuTNFb_WYfwXJKQYE072ImMKZ14ny6NXAh5JH3d0sYUmitcgkR52N8kT6NTnfMRQYEImm7IfPQekk2YA4Qav8H9kQYhs6Ce9873hBClyCPnBtDUoaGJy6m2Hzyuz3kowIUMt54FPuaRBCy52hIA0UwOV1sZP3Lsnh76STZqDmtRoJtdFDChYph94QF0L0hpbuU9M6iI3psSA'
    }
    loginService = fixture.debugElement.injector.get(LoginService);
    const spyService = spyOn(loginService, 'login').and.callFake(() => of(apiResponse));

    // Fill in info
    username.value = 'everis';
    password.value = 'everis2019';
    username.dispatchEvent(new Event('input', {
        bubbles: true,
        cancelable: true
    }));
    password.dispatchEvent(new Event('input', {
        bubbles: true,
        cancelable: true
    }));
    fixture.detectChanges();

    // Autenticate
    loginButton.click();
    fixture.detectChanges();

    const userDropdown: HTMLElement = rootElement.querySelector('#userDropdown');
    expect(userDropdown).toBeDefined();
    expect(spyService).toHaveBeenCalledTimes(1);
  });

  it('shouldn\'t login when credentials are incorrect', () => {
    // Mock the login service
    const apiResponse = 'Credenciales inválidas'
    loginService= fixture.debugElement.injector.get(LoginService);
    const spyService = spyOn(loginService, 'login').and.callFake(() => of(apiResponse));
    
    // Fill in info
    username.value = 'usuario';
    password.value = '123456';
    username.dispatchEvent(new Event('input', {
        bubbles: true,
        cancelable: true
    }));
    password.dispatchEvent(new Event('input', {
        bubbles: true,
        cancelable: true
    }));
    fixture.detectChanges();

    // Autenticate
    loginButton.click();
    fixture.detectChanges();

    errorLabel= rootElement.querySelector('login-form #error');
    expect(errorLabel).toBeDefined();
    expect(spyService).toHaveBeenCalledTimes(1);
  });
});
