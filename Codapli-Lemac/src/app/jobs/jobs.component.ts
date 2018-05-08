import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs: any[] = new Array();

  constructor(private jobService: JobsService) { }

  ngOnInit() {
    this.jobService.getJobsFiles$().subscribe(response => {
     this.jobs = response;
    });

  }

}
