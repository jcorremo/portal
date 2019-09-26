import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CartComponent } from '../cart/cart.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { LoginComponent } from '../login/login.component';
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

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    const token = {
      access_token_exp: '2019-05-17T18:14:38-05:00'
    }
    localStorage.setItem('token', JSON.stringify(token));
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
