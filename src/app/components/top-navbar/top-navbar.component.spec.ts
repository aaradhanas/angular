import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TopNavbarComponent } from './top-navbar.component';
import { DataService } from '../../services/data.service';

describe('TopNavbarComponent', () => {
  let component: TopNavbarComponent;
  let fixture: ComponentFixture<TopNavbarComponent>;
  let dataService: DataService;

  beforeEach(async(() => {
    const dataServiceStub = {};
    TestBed.configureTestingModule({
      declarations: [ TopNavbarComponent ],
      providers : [ {provide: DataService, useClass: dataServiceStub} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavbarComponent);
    component = fixture.componentInstance;

    const de = fixture.debugElement.query(By.css('app-top-navbar'));
    dataService = de.injector.get(DataService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('version display', () => {
    component.version = 'develop';
    fixture.detectChanges();

    const de = fixture.debugElement.query(By.css('app-top-navbar .version'));
    const el: HTMLElement = de.nativeElement;
    expect(el.textContent).toEqual(component.version);
  });

  it('display hash text modal', () => {
    component.hashText = 'Test hash text';
    component.showModal = true;
    fixture.detectChanges();

    const de = fixture.debugElement.query(By.css('app-top-navbar modal-wrapper #dlnk'));
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
