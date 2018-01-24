import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';

import { TopNavbarComponent } from './top-navbar.component';
import { DataService } from '../../services/data.service'

describe('TopNavbarComponent', () => {
  let component: TopNavbarComponent;
  let fixture: ComponentFixture<TopNavbarComponent>;

  beforeEach(async(() => {
    const dataServiceStub = {
      versionChange: new EventEmitter(),
      isLeftVisible() {
          return false;
      }
    };

    TestBed.configureTestingModule({
      declarations: [ TopNavbarComponent ],
      providers : [ {provide: DataService, useValue: dataServiceStub} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('version display', () => {
    component.version = 'develop';
    fixture.detectChanges();

    const de = fixture.debugElement.query(By.css('.version'));
    const el: HTMLElement = de.nativeElement;
    expect(el.textContent).toContain(component.version);
  });

  it('display hash text modal', () => {
    // TODO Add encode logic
    component.hashText = 'Test hash text';
    component.showModal = true;
    fixture.detectChanges();

    const de = fixture.debugElement.query(By.css('.modal-wrapper #dlnk'));
    const el: HTMLElement = de.nativeElement;

    expect(el.textContent).toEqual(component.hashText);
  });

  it('hide hash text modal', () => {
    component.showModal = false;
    fixture.detectChanges();

    const de = fixture.debugElement.query(By.css('app-top-navbar modal-wrapper'));
    expect(de).toBeNull();
  });
});
