import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
})

export class DropdownsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredCarrosalData: any[] = [];
  searchQuery: string = '';
  pageSize: number = 10;
  pageIndex: number = 0;
  awards_recognation_Form!: FormGroup;
  awards_recognation_Data: any;
  selectedItem: any = { _id: '', name: '', imageUrl: '' };
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  fileError: string = '';

  constructor(
    private service: ServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchawards_recognation_Data();
  }

  initializeForm(): void {
    this.awards_recognation_Form = this.fb.group({
      name: ['', Validators.required],
      imageUrl: [null, Validators.required]
    });
  }

  fetchawards_recognation_Data() {
    this.service.getawards_recognation().subscribe(
      (response) => {
        console.log(response);
        this.awards_recognation_Data = response;
        this.filterData();
        // this.awards_recognation_Data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
      }
    );
  }
  
filterData() {
  const query = this.searchQuery.toLowerCase();
  this.filteredCarrosalData = this.awards_recognation_Data.filter((item: { name: string; }) => 
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
      this.awards_recognation_Form.patchValue({ imageUrl: file });
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
    this.awards_recognation_Form.patchValue({
      name: item.name,
      imageUrl: item.imageUrl
    });
  }

  resetForm(): void {
    this.awards_recognation_Form.reset();
    this.awards_recognation_Form.markAsUntouched();
    this.awards_recognation_Form.markAsPristine();
    this.selectedItem = { _id: '', name: '', imageUrl: '' };
  }

  addawards_recognation(event: Event): void {
    event.preventDefault();
    if (this.awards_recognation_Form.invalid) {
      this.awards_recognation_Form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.awards_recognation_Form.value.name);
    const file = this.awards_recognation_Form.value.imageUrl;

    if (!file) {
      console.error('Image file is not selected');
      return;
    }

    formData.append('imageUrl', file);

    this.service.addawards_recognation(formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchawards_recognation_Data();
        alert('Record Added successfully!');
        this.showAddForm = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateawards_recognation(id: number, event: Event): void {
    event.preventDefault();

    if (this.awards_recognation_Form.invalid) {
      this.awards_recognation_Form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.awards_recognation_Form.value.name);
    const file = this.awards_recognation_Form.value.imageUrl;

    // Check if an image file is selected
    if (file instanceof File) {
      formData.append('imageUrl', file);
    } else {

    }

    this.service.updateawards_recognation(id, formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchawards_recognation_Data(); 
        alert('Record Updated successfully!');
        this.showEditForm = false;
        this.resetForm(); // Reset form after successful update
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteawards_recognation(id: number): void {
   
    const confirmed = confirm('Are you sure you want to delete this award/recognition?');
  
    if (confirmed) {
      this.service.deleteawards_recognation(id).subscribe(
        (response) => {
          console.log(response);
          this.fetchawards_recognation_Data();
          this.selectedItem = { _id: '', name: '', imageUrl: '' };
          this.awards_recognation_Form.reset();
          this.showAddForm = false;
         
          alert('Award/Recognition deleted successfully!');
        },
        (error) => {
          console.error('Error deleting award/recognition:', error);
        }
      );
    }
  }
  




  getFileName(url: string): string {
    return url.split('/').pop() || '';
  }


}