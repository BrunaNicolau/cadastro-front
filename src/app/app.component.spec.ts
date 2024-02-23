import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ChangeDetectorRef } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let changeDetector: ChangeDetectorRef;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents()
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    changeDetector = fixture.debugElement.injector.get(ChangeDetectorRef); // Obtain reference to ChangeDetectorRef
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call detectChanges on ngAfterContentChecked', () => {
    component.ngAfterContentChecked();
    expect(changeDetector.detectChanges).toHaveBeenCalled();
  });
});
