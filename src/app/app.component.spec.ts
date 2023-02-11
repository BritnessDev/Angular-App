import { TestBed, ComponentFixture,  async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let httpTestingController: HttpTestingController;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  }));
  it('should call callAzureFunction when button is clicked', () => {
    spyOn(component, 'callAzureFunction')

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.callAzureFunction).toHaveBeenCalled();
  });

  it('should make a GET request to the Azure function', () => {
    const testData = { message: "Hello World" };
    component.callAzureFunction();
    const req = httpTestingController.expectOne('http://localhost:7163/api/test');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });
});
