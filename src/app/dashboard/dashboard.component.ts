import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { EApplications } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent {
  @ViewChild('pdsFrame')
  pds_frame!: ElementRef;
  @ViewChild('pxFrame')
  px_frame!: ElementRef;

  destinationUrl: string = '';
  public applications = EApplications;

  constructor(private http: HttpClient) {
    
  }

  public pxBackupNavigate(url: string) {
    this.destinationUrl = url;
    switch (url) {
      case EApplications.PDS_APP:
        const pdsFrame = this.pds_frame.nativeElement as HTMLIFrameElement;
        setTimeout(function () {
          pdsFrame.contentWindow?.postMessage({"token": localStorage.getItem('token')}, url);
        }, 1000)
        break;
      case EApplications.PX_BACKUP_APP:
        const pxFrame = this.px_frame.nativeElement as HTMLIFrameElement;
        setTimeout(function () {
          pxFrame.contentWindow?.postMessage({"token": localStorage.getItem('token')}, url);
        }, 1000)
        break;
      default:
        console.warn("no frame match");
        break;
    }
  }
}
