import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

interface Data {
    message: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  title = 'tdd-angular';
  constructor(private http: HttpClient) {}
  callAzureFunction() {
    this.http.get<Data>('http://localhost:7163/api/test').subscribe(data => {
if(data.message === undefined)
      alert(data.message);
    });
  }
}
