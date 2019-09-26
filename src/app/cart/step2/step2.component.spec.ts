import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2Component } from './step2.component';
import { CartComponent } from '../cart.component';
import { LoginFormComponent } from 'src/app/components/login-form/login-form.component';
import { LoginComponent } from 'src/app/login/login.component';
import { HomeComponent } from 'src/app/home/home.component';
import { ProductsComponent } from 'src/app/products/products.component';
import { ProductListComponent } from 'src/app/product-list/product-list.component';
import { Step0Component } from '../step0/step0.component';
import { Step1Component } from '../step1/step1.component';
import { Step3Component } from '../step3/step3.component';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { CarouselComponent } from 'src/app/components/carousel/carousel.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { ImagesCarouselComponent } from 'src/app/components/images-carousel/images-carousel.component';
import { CardHorizontalComponent } from 'src/app/components/card-horizontal/card-horizontal.component';
import { CardCategoryComponent } from 'src/app/components/card-category/card-category.component';
import { PrefooterComponent } from 'src/app/components/prefooter/prefooter.component';
import { CardProductComponent } from 'src/app/components/card-product/card-product.component';
import { CartProductComponent } from 'src/app/components/cart-product/cart-product.component';
import { StepsComponent } from 'src/app/components/steps/steps.component';
import { CartFormComponent } from 'src/app/components/cart-form/cart-form.component';
import { CartTotalComponent } from 'src/app/components/cart-total/cart-total.component';
import { PayMethodComponent } from 'src/app/components/pay-method/pay-method.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import localeCO from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeCO);

describe('Step2Component', () => {
  let component: Step2Component;
  let fixture: ComponentFixture<Step2Component>;

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
    sessionStorage.setItem('cart', JSON.stringify({
      items:[],
      total: 100
    }));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
