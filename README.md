
```
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>App30</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body class="mat-typography">
  <app-root></app-root>
</body>
</html>

```

```
ng0: 
	npm install -g @angular/cli	
ng: 
	ng version
ng1: 
	ng new app30
ng1.1:
	cd app30 && npm install --save json-server
	cd app30 && mkdir server 
ng2:
	cd app30 && ng g c first
ng3:
	cd app30 && npm run generate
ng4:
	cd app30 && npm run serve
ng5:
	cd app30 && ng generate component home
ng6:
	cd app30 && ng generate component about
ng7:
	cd app30 && ng add @angular/material
ng8:
	cd app30 && ng generate service data
ng9:
	cd app30 && ng generate interface product 

```

```
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

```

```
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

```

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ɵɵclassMapInterpolate1 } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app30';
}

```

```
<mat-toolbar color="primary" >
    <h1>
        ngStore
    </h1>
    <button mat-button routerLink="/">Home</button>
    <button mat-button routerLink="/about">About</button>
</mat-toolbar>
<router-outlet></router-outlet>
```

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent },
  {path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

```
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Product } from '../product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  products : Product[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]>) => {
      console.log(res);
      this.products = res.body;
    });

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  public firstPage(){
    this.products = [];
    this.dataService.sendGetRequestToUrl(this.dataService.first)
      .pipe( takeUntil( this.destroy$ ) ).subscribe( (res: HttpResponse<Product[]>) => {
        console.log(res);
        this.products = res.body;

      })
  }
  public previousPage(){
    if(this.dataService.prev !== undefined 
      && this.dataService.prev !== ''){
        this.products = [];
        this.dataService.sendGetRequestToUrl(this.dataService.prev)
        .pipe( takeUntil( this.destroy$ ) ).subscribe( (res: HttpResponse<Product[]>) => {
          console.log(res);
          this.products = res.body;
        });
    }
  }
  public nextPage(){
    if(this.dataService.next !== undefined 
      && this.dataService.next !== ''){
        this.products = [];
        this.dataService.sendGetRequestToUrl(this.dataService.next)
        .pipe( takeUntil( this.destroy$ ) ).subscribe( (res: HttpResponse<Product[]>) => {
          console.log(res);
          this.products = res.body;
        });
    }
  }
  public lastPage(){
    this.products = [];
    this.dataService.sendGetRequestToUrl(this.dataService.last)
      .pipe( takeUntil( this.destroy$ ) ).subscribe( (res: HttpResponse<Product[]>) => {
        console.log(res);
        this.products = res.body;

      })
  }
  
}

```

```
<div>
    <button (click)="firstPage()" mat-button>First</button> 
    <button (click)="previousPage()" mat-button>Prev</button> 
    <button (click)="nextPage()" mat-button>Next</button> 
    <button (click)="lastPage()" mat-button>Last</button> 
</div>
<div style="padding: 13px">
    <mat-spinner *ngIf="products.length === 0"></mat-spinner>
    <mat-card *ngFor="let product of products" style="margin-top:10px;">
        <mat-card-header>
            <mat-card-title>#{{product.id}} {{product.name}}</mat-card-title>
            <mat-card-subtitle>
                {{product.price}} $/ {{product.quantity}}
            </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
            <p>
                {{product.material}}
            </p>
            <img style="height: 100%; width: 100%;" src="{{product.imageUrl}}"/>
        </mat-card-content>
        <mat-card-action>
            <button mat-button> Buy Product </button>
        </mat-card-action>
    </mat-card>
</div>
<div>
    <button (click)="firstPage()" mat-button>First</button> 
    <button (click)="previousPage()" mat-button>Prev</button> 
    <button (click)="nextPage()" mat-button>Next</button> 
    <button (click)="lastPage()" mat-button>Last</button> 
</div>

```
