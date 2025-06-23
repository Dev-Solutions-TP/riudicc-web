import { Component, inject, signal } from '@angular/core';
import { SociedadEuService } from '../sociedad-eu-page/services/sociedad.service';
import { PageTitleComponent } from "../../components/page-title/page-title.component";


export interface WorkPackage {
  wpNumber: string;
  name: string;
  lead: string;
  effort: number;
  startMonth: number;
  endMonth: number;
  deliverables: string[];
}




@Component({
  selector: 'app-work-packages-page-component',
  imports: [PageTitleComponent],
  templateUrl: './work-packages-page.component.html',
})
export class WorkPackagesPageComponent {

  private sociedadService = inject(SociedadEuService);


  workPackages = signal<WorkPackage[]>([
    {
      wpNumber: 'WP1',
      name: 'Project management and strategic coordination',
      lead: '1 - UCM',
      effort: 108.00,
      startMonth: 1,
      endMonth: 24,
      deliverables: [
        'D1.1 – Data Management Plan',
        'D1.2 – Strategic & Implementation Plan',
        'D1.3 – Agenda & minutes of major meetings of the project',
        'D1.4 – Progress Report',
      ],
    },
    {
      wpNumber: 'WP2',
      name: 'Study of international mobility needs and priorities',
      lead: '5 - UNICACH',
      effort: 41.00,
      startMonth: 1,
      endMonth: 6,
      deliverables: [
        'D2.1 – Why reduced mobility in the geographical areas bordering this project?',
        'D2.2 – Guidelines for increased integration of vulnerable population in mobility plans',
      ],
    },
    {
      wpNumber: 'WP3',
      name: 'Scholarship and bilateral pilot program – study, research, and administrative mobility',
      lead: '7 - USAC',
      effort: 71.00,
      startMonth: 3,
      endMonth: 12,
      deliverables: [
        'D3.1 – A proposal for a training program for International Relations Offices',
        'D3.2 – A guideline to develop a strategy for a scholarship program',
        'D3.3 – List of studies, programs and research priorities from the universities involved for mobility proposals',
      ],
    },
    {
      wpNumber: 'WP4',
      name: 'Roadmap towards the legal structure of an international alliance',
      lead: '10 - UNICARIBE',
      effort: 107.00,
      startMonth: 10,
      endMonth: 20,
      deliverables: [
        'D4.1 – Guidelines for the legal development of a transnational alliance',
        'D4.2 – Analysis of the barriers and advantages of national, international & European educational legislation',
        'D4.3 – Why a Latin-American, Caribbean, and European partnership matters?',
      ],
    },
    {
      wpNumber: 'WP5',
      name: 'International alliances Europe, Latin America, and the Caribbean region: learning to be European partners',
      lead: '2 - UNIME',
      effort: 41.00,
      startMonth: 12,
      endMonth: 17,
      deliverables: [
        'D5.1 – Exploring fundings, activities and priorities across EU programs',
        'D5.2 – How to become a European partner in education?',
      ],
    },
    {
      wpNumber: 'WP6',
      name: 'Structure of the exchange and communication networks among Latin American, Caribbean, and European partners',
      lead: '4 - UPS',
      effort: 162.00,
      startMonth: 2,
      endMonth: 24,
      deliverables: [
        'D6.1 – Communication & dissemination plan',
        'D6.2 – Creation and development of the website of the project',
        'D6.3 – Dissemination of good practices – communication strategies to promote joint programs',
      ],
    },
    {
      wpNumber: 'WP7',
      name: 'Building sustainable measures for the future of the alliance',
      lead: '3 - UDA',
      effort: 112.00,
      startMonth: 10,
      endMonth: 24,
      deliverables: [
        'D7.1 – Plan for the establishment of a common interuniversity observatory',
        'D7.2 – Creation of research clusters on specific themes',
        'D7.3 – Roadmap towards a Latin American and Caribbean educative summit',
        'D7.4 – University development, local progress, and international integration: developing sustainable projects',
      ],
    }
  ]);



}