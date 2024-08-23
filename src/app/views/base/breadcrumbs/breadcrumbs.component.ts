import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/Service/service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredCarrosalData: any[] = [];
  searchQuery: string = '';
  pageSize: number = 10;
  pageIndex: number = 0;
  Home_2_Cards_Form: FormGroup | any;
  Home_2_Cards_Data: any;
  fileError: string = '';
  selectedItem: any = { _id: '', reportnme: '', pdf: '' };
  showAddForm: boolean = false;
  showEditForm: boolean = false;


  constructor(
    private service: ServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchHome_2_Cards_Data();
    
  }

  initializeForm(): void {
    this.Home_2_Cards_Form = this.fb.group({
      reportnme: ['', Validators.required],
      pdf: [null, Validators.required]
    });
  }

  fetchHome_2_Cards_Data(): void {
    this.service.getreport().subscribe(
      (response) => {
        console.log(response);
        this.Home_2_Cards_Data = response;
        this.filterData();
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  filterData() {
    const query = this.searchQuery.toLowerCase();
    this.filteredCarrosalData = this.Home_2_Cards_Data.filter((item: { reportnme: string; }) => 
      item.reportnme.toLowerCase().includes(query)
    );
    this.filteredCarrosalData.sort((a, b) => b.id - a.id);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  onSearchChange() {
    this.filterData();
  }

  // onFileChange(event: any): void {
  //   const file = (event.target as HTMLInputElement)?.files?.[0];
  //   this.Home_2_Cards_Form.patchValue({ pdf: file });
  // }
  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.Home_2_Cards_Form.patchValue({ pdf: file });
      this.fileError = '';
    } else {
      this.fileError = 'PDF file is required.';
    }
  }


  toggleAddForm(): void {
    this.showAddForm = true;
    this.showEditForm = false;
    this.resetForm();
  }

  toggleEditForm(item: any): void {
    this.selectedItem = { ...item };
    this.Home_2_Cards_Form.patchValue({
      reportnme: item.reportnme,
      pdf: item.pdf
    });
    this.showEditForm = true;
    this.showAddForm = false;
  }

  resetForm(): void {
    this.Home_2_Cards_Form.reset();
    this.Home_2_Cards_Form.markAsUntouched();
    this.Home_2_Cards_Form.markAsPristine();
  }

  add_Home_2_Cards(event: Event): void {
    event.preventDefault();
    const formData = new FormData();
    formData.append('reportnme', this.Home_2_Cards_Form.value.reportnme);
    formData.append('pdf', this.Home_2_Cards_Form.value.pdf);

    this.service.addreport(formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchHome_2_Cards_Data();
        this.showAddForm = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // update_Home_2_Cards(id: number, event: Event): void {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append('reportnme', this.Home_2_Cards_Form.value.reportnme);
  //   formData.append('pdf', this.Home_2_Cards_Form.value.pdf);

  //   this.service.updatereport(id, formData).subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.fetchHome_2_Cards_Data();
  //       this.showEditForm = false;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }
  update_Home_2_Cards(id: number, event: Event): void {
    event.preventDefault();
    if (this.Home_2_Cards_Form.invalid) {
      this.Home_2_Cards_Form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('reportnme', this.Home_2_Cards_Form.value.reportnme);
    
 
    if (this.Home_2_Cards_Form.value.pdf) {
      formData.append('pdf', this.Home_2_Cards_Form.value.pdf);
    } else {
    }

    this.service.updatereport(id, formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchHome_2_Cards_Data();
        alert('Record Updated successfully!');
        this.showEditForm = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  delete_Home_2_Cards(id: number | undefined): void {
    if (!id || id <= 0) {
      console.error('Invalid ID for delete operation:', id);
      return;
    }
  
    const confirmed = confirm('Are you sure you want to delete this Report?');
  
    if (confirmed) {
      this.service.deletereport(id).subscribe(
        () => {
          console.log('Report deleted successfully');
  
          // Remove the deleted item from support_data
          // this.fetchHome_2_Cards_Data = this.fetchHome_2_Cards_Data.filter((item: any) => item.id !== id);
  
          // Optionally, reset selectedItem and form if necessary
          this.selectedItem = { _id: '', name: '', imageUrl: '' };
          this.Home_2_Cards_Form.reset();
          this.showAddForm = false;
  
          // Show success alert
          alert(' deleted successfully!');
          this.fetchHome_2_Cards_Data(); 
        },
        (error) => {
          console.error('Error deleting supporter:', error);
        }
      );
    }
  }
  
  // delete_Home_2_Cards(id: number): void {
   
  //   const confirmed = confirm('Are you sure you want to delete this Report?');
  
  //   if (confirmed) {
  //     this.service.deletereport(id).subscribe(
  //       (response) => {
  //         console.log(response);
  //         this.fetchHome_2_Cards_Data();
  //         this.Home_2_Cards_Form.reset();
  //         // Show success alert
  //         alert('Report deleted successfully!');
  //         this.fetchHome_2_Cards_Data();
  //       },
        
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   }
  // }
  getFileName(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
}
