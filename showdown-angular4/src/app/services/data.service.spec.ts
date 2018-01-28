import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpModule } from '@angular/http';

describe('DataService isolated test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService],
      imports : [HttpModule]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  it('check versions list length', inject([DataService], (service: DataService) => {
    service.getVersions().subscribe( versions => {
      expect(versions.length).toEqual(30);
    });
  }));

  it('check first and latest version', inject([DataService], (service: DataService) => {
    service.getVersions().subscribe( versions => {
      expect(versions[0]).toEqual('1.8.6');
      expect(versions[versions.length - 1]).toEqual('1.3.0');
    });
  }));

  it('update left nav bar visibility', inject([DataService], (service: DataService) => {
    // Check default value of isLeftVisible
    expect(service.isLeftVisible()).toEqual(true);

    // Set left visible value, susbscribe to the event and check value
    service.setLeftVisible(false);
    service.leftVisibleChange.subscribe(isVisible => {
      expect(isVisible).toEqual(false);
    });
  }));

  it('update version', inject([DataService], (service: DataService) => {

    // Update version value, susbscribe to the event and check value
    service.updateVersion('1.0.0');
    service.versionChange.subscribe( version => {
      expect(version).toEqual('1.0.0');
    });
  }));

  it('update opts', inject([DataService], (service: DataService) => {

     // Update options, susbscribe to the event and check value
    service.updateOptions({'omitExtraWLInCodeBlocks': true});
    service.optionsChange.subscribe( options => {
      expect(options).toEqual({'omitExtraWLInCodeBlocks': true});
    });
  }));

});
