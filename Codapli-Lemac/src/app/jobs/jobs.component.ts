import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';

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
            <div class="col-md-2">
              <button type="button" class="btn btn-sm btn-primary" [routerLink]="['/settings']">Configuracion</button>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-12">
              <table class="table table-striped table-bordered table-sm table-hover">
                <thead>
                  <tr>
                    <th scope="col">Ensayos</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let job of jobPage">
                    <td>{{job}}</td>
                    <td><a href="#" class="fa fa-eye" aria-hidden="true"></a>
                      <a  (click)="deleteJob(job)" href="#" class="fa fa-trash" aria-hidden="true"></a>
                      <a  (click)="download(job)" href="#" class="fa fa-download" aria-hidden="true"></a>
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

  constructor(private jobService: JobsService) { }

  ngOnInit() {
   this.refreshJobs();
   

  }
  refreshJobs() {
    this.jobService.getJobsFiles$().subscribe(response => {
      this.jobs = response;
      this.pageChange(1);
     });
  }

  deleteJob(file:String) {
    this.jobService.deleteJob$(file).subscribe( response => {
        this.refreshJobs();
    });
  }

  download(file:String){

  }

  pageChange(page: number){
    this.jobPage = this.jobs.slice((this.pageSize * (page - 1)), (this.pageSize * (page - 1)) + this.pageSize);
  }

}
