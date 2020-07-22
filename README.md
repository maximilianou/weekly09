
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
    this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe(
      (res: HttpResponse<Product[]>) => {
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

```
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:3000/products";

  public first:  string = "";
  public prev:   string = "";
  public next:   string = "";
  public last:   string = "";

  constructor(private httpClient: HttpClient) { 

  }

  handleError(error: HttpErrorResponse){
    let errorMessage = "Unknown error!";
    if(error.error instanceof ErrorEvent){
      errorMessage = `Error: ${error.error.message}`;
    }else{
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest(){
    //const options = { params: new HttpParams({fromString: "_page=1&_limit=5"}) };
    return this.httpClient.get<Product[]>( this.REST_API_SERVER, 
      { params: new HttpParams( { fromString: "_page=1&_limit=5"} ), 
          observe: "response" } )
            .pipe( retry(3), catchError( this.handleError ), tap( res => {
              console.log(res.headers.get('Link'));
              this.parseLinkHeader(res.headers.get('Link'))
            }) );
  }
  public sendGetRequestToUrl(url: string){
    return this.httpClient.get<Product[]>(url, { observe: "response"})
    .pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader( res.headers.get('Link') )
    }));
  }
  parseLinkHeader(header){
    if(header && header.length === 0){
      return;
    }
    let parts = header.split(',');
    const links = {};
    parts.forEach( p => {
      let section = p.split(';');
      const url = section[0].replace(/<(.*)>/,'$1').trim();
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    });
    this.first = links["first"];
    this.prev = links["prev"];
    this.next = links["next"];
    this.last = links["last"];
  }

}

```

```
export interface Product {
    id: number;
    name: string;
    material: string;
    price: string;
    quantity: number;
    imageUrl: string;
}

```
