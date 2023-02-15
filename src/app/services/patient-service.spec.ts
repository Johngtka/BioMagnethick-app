/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PatientService } from './patient-service';

describe('Service: PatientService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PatientService],
        });
    });

    it('should ...', inject([PatientService], (service: PatientService) => {
        expect(service).toBeTruthy();
    }));
});
