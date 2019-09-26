import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CardComponent } from './components/card/card.component';
import { CardHorizontalComponent } from './components/card-horizontal/card-horizontal.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { Step0Component } from './cart/step0/step0.component';
import { Step1Component } from './cart/step1/step1.component';
import { Step2Component } from './cart/step2/step2.component';
import { Step3Component } from './cart/step3/step3.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { ImagesCarouselComponent } from './components/images-carousel/images-carousel.component';
import { StepsComponent } from './components/steps/steps.component';
import { CartTotalComponent } from './components/cart-total/cart-total.component';
import { PayMethodComponent } from './components/pay-method/pay-method.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CardCategoryComponent } from './components/card-category/card-category.component';
import { PrefooterComponent } from './components/prefooter/prefooter.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { CartFormComponent } from './components/cart-form/cart-form.component';
import { LoaderComponent } from './components/loader/loader.component';
import { registerLocaleData } from '@angular/common';
import localeCO from '@angular/common/locales/es-CO'
import { MyInterceptor } from './my-interceptor';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
// icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCommentAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// Ngrx
import { StoreModule } from '@ngrx/store';
import { reducers, initialState } from './app.state';

registerLocaleData(localeCO);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductsComponent,
    CartComponent,
    ProductListComponent,
    CardComponent,
    CardHorizontalComponent,
    CardProductComponent,
    Step0Component,
    Step1Component,
    Step2Component,
    Step3Component,
    CartProductComponent,
    ImagesCarouselComponent,
    StepsComponent,
    CartTotalComponent,
    PayMethodComponent,
    NavBarComponent,
    CarouselComponent,
    CardCategoryComponent,
    PrefooterComponent,
    FooterComponent,
    LoginFormComponent,
    CartFormComponent,
    LoaderComponent,
    ChatbotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    StoreModule.forRoot(reducers, {initialState})
  ],
  providers: [
		{
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    }
	],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faCommentAlt, faSignOutAlt)
  }
}
