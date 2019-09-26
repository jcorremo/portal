import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartFormComponent } from './cart-form.component';
import { CartComponent } from 'src/app/cart/cart.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { LoginComponent } from 'src/app/login/login.component';
import { HomeComponent } from 'src/app/home/home.component';
import { ProductsComponent } from 'src/app/products/products.component';
import { ProductListComponent } from 'src/app/product-list/product-list.component';
import { Step0Component } from 'src/app/cart/step0/step0.component';
import { Step1Component } from 'src/app/cart/step1/step1.component';
import { Step2Component } from 'src/app/cart/step2/step2.component';
import { Step3Component } from 'src/app/cart/step3/step3.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { CardComponent } from '../card/card.component';
import { ImagesCarouselComponent } from '../images-carousel/images-carousel.component';
import { CardHorizontalComponent } from '../card-horizontal/card-horizontal.component';
import { CardCategoryComponent } from '../card-category/card-category.component';
import { PrefooterComponent } from '../prefooter/prefooter.component';
import { CardProductComponent } from '../card-product/card-product.component';
import { CartProductComponent } from '../cart-product/cart-product.component';
import { StepsComponent } from '../steps/steps.component';
import { CartTotalComponent } from '../cart-total/cart-total.component';
import { PayMethodComponent } from '../pay-method/pay-method.component';
import { LoaderComponent } from '../loader/loader.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('CartFormComponent', () => {
  let component: CartFormComponent;
  let fixture: ComponentFixture<CartFormComponent>;

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
    fixture = TestBed.createComponent(CartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
