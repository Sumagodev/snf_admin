import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-accordions',
  templateUrl: './accordions.component.html',
  styleUrls: ['./accordions.component.scss']
})
export class AccordionsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  Home_4_Cards_Form: FormGroup | any;
  Home_4_Cards_Data: any;
  selectedItem: any = { _id: '', name: '', para: '', city: '', imageUrl: '' };
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  fileError: string = '';
  filteredCarrosalData: any[] = [];
  searchQuery: string = '';
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(
    private service: ServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchHome_4_Cards_Data();
  }

  initializeForm(): void {
    this.Home_4_Cards_Form = this.fb.group({
      name: ['', Validators.required],
      para: ['', Validators.required],
      city: ['', Validators.required],
      imageUrl: [null, Validators.required]
    });
  }

  fetchHome_4_Cards_Data(): void {
    this.service.get_Home_4_Cards().subscribe(
      (response) => {
        console.log(response);
        this.Home_4_Cards_Data = response;
        this.filterData();
        // this.Home_4_Cards_Data.sort((a: any, b:any) => b.id - a.id);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  
filterData() {
  const query = this.searchQuery.toLowerCase();
  this.filteredCarrosalData = this.Home_4_Cards_Data.filter((item: { name: string; }) => 
    item.name.toLowerCase().includes(query)
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
  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.Home_4_Cards_Form.patchValue({ imageUrl: file });
      this.fileError = '';
    } else {
      this.fileError = 'Image file is required.';
    }
  }

  toggleAddForm(): void {
    this.showAddForm = true;
    this.showEditForm = false;
    this.resetForm();
  }

  toggleEditForm(item: any): void {
    this.selectedItem = { ...item };
    this.showEditForm = true;
    this.showAddForm = false;

    this.Home_4_Cards_Form.patchValue({
      name: item.name,
      para: item.para,
      city: item.city,
      imageUrl: null // Clear the file input
    });
  }

  resetForm(): void {
    this.Home_4_Cards_Form.reset();
    this.Home_4_Cards_Form.markAsUntouched();
    this.Home_4_Cards_Form.markAsPristine();
  }

  add_Home_4_Cards(event: Event): void {
    event.preventDefault();
    if (this.Home_4_Cards_Form.invalid) {
      this.Home_4_Cards_Form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.Home_4_Cards_Form.value.name);
    formData.append('para', this.Home_4_Cards_Form.value.para);
    formData.append('city', this.Home_4_Cards_Form.value.city);
    formData.append('imageUrl', this.Home_4_Cards_Form.value.imageUrl);

    this.service.add_Home_4_Cards(formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchHome_4_Cards_Data();
        alert('Record Added successfully!');
        this.showAddForm = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  update_Home_4_Cards(id: number, event: Event): void {
    event.preventDefault();
    if (this.Home_4_Cards_Form.invalid) {
      this.Home_4_Cards_Form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.Home_4_Cards_Form.value.name);
    formData.append('para', this.Home_4_Cards_Form.value.para);
    formData.append('city', this.Home_4_Cards_Form.value.city);

    if (this.Home_4_Cards_Form.value.imageUrl) {
      formData.append('imageUrl', this.Home_4_Cards_Form.value.imageUrl);
    } else {
    }

    this.service.update_Home_4_Cards(id, formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchHome_4_Cards_Data();
        alert('Record Updated successfully!');
        this.showEditForm = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  delete_Home_4_Cards(id: number): void {
   
    const confirmed = confirm('Are you sure you want to delete this Testimonial?');
  
    if (confirmed) {
      this.service.delete_Home_4_Cards(id).subscribe(
        (response) => {
          console.log(response);
          this.fetchHome_4_Cards_Data();
          // Show success alert
          alert('Testimonial deleted successfully!');
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  


  getFileName(url: string): string {
    return url.split('/').pop() || '';
  }

}