import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  template:
     `
       <div class="container">
        <div class="col-md-12">
          <div class="row my-3">
            <h4>Ensayos</h4>
          </div>
          <div class="row my-3">
            <div class="col-md-1">
              <button type="button" class="btn btn-sm btn-primary" [routerLink]="['/job']">Nuevo</button>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-12">
              <table class="table table-striped table-bordered table-sm table-hover">
                <thead>
                  <tr>
                    <th scope="col">Ensayos</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Tipo</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let job of jobPage">
                    <td>{{job.name}}</td>
                    <td>{{job.date}}</td>
                    <td>{{job.tipo}}</td>
                    <td><a  (click)="view(job)" class="fa fa-eye" aria-hidden="true"></a>
                      <a  (click)="deleteJob(job)" href="#" class="fa fa-trash" aria-hidden="true"></a>

                    </td>
                  </tr>
                </tbody>
              </table>
              <ngb-pagination class="d-flex justify-content-center"
                    [collectionSize]="jobs.length"
                    [pageSize]= "pageSize"
                    [page]= "page"
                    size="sm"
                    (pageChange)="pageChange($event)">
              </ngb-pagination>

            </div>
          </div>
        </div>
      </div>
  `
})
export class JobsComponent implements OnInit {

  jobs: any[] = new Array();
  jobPage:any[] = new Array();

  page: number = 1;
  pageSize: number = 10;

  constructor(private jobService: JobsService, private router: Router) { }

  ngOnInit() {
   this.refreshJobs();


  }
  refreshJobs() {
    this.jobService.getJobsFiles$().subscribe(response => {
      this.jobs = response;
      this.pageChange(1);
     });
  }

  deleteJob(job:any) {
    this.jobService.deleteJob$(job.file).subscribe( response => {
        this.refreshJobs();
    });
  }

  view(job:any){
    this.router.navigate(['/job/view', job.file]);
  }

  pageChange(page: number){
    this.jobPage = this.jobs.slice((this.pageSize * (page - 1)), (this.pageSize * (page - 1)) + this.pageSize);
  }

}
