import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredCarrosalData: any[] = [];
  searchQuery: string = '';
  pageSize: number = 10;
  pageIndex: number = 0;
  Newsartical_Form!: FormGroup;
  Newsartical_Form_Data: any;
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
    this.fetchNewsartical_Form_Data();
  }

  initializeForm(): void {
    this.Newsartical_Form = this.fb.group({
      name: ['', Validators.required],
      imageUrl: [null] // Not required during initialization
    });
  }

  fetchNewsartical_Form_Data() {
    this.service.getarticle_on_snf().subscribe(
      (response) => {
        console.log(response);
        this.Newsartical_Form_Data = response;
        this.filterData();
        // this.Newsartical_Form_Data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  filterData() {
    const query = this.searchQuery.toLowerCase();
    this.filteredCarrosalData = this.Newsartical_Form_Data.filter((item: { name: string; }) => 
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
    const file = event.target.files[0];
    if (file) {
      this.Newsartical_Form.patchValue({ imageUrl: file });
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
    this.Newsartical_Form.patchValue({
      name: item.name,
      imageUrl: null // Clear the file input
    });
  }

  resetForm(): void {
    this.Newsartical_Form.reset();
    this.Newsartical_Form.markAsUntouched();
    this.Newsartical_Form.markAsPristine();
    this.selectedItem = { _id: '', name: '', imageUrl: '' };
  }

  addarticle_on_snf(): void {
    if (this.Newsartical_Form.invalid) {
      this.Newsartical_Form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.Newsartical_Form.value.name);
    const file = this.Newsartical_Form.value.imageUrl;

    if (!file) {
      this.fileError = 'Image file is required.';
      return;
    }

    formData.append('imageUrl', file);

    this.service.addarticle_on_snf(formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchNewsartical_Form_Data();
        alert('Record Added successfully!');  
        this.showAddForm = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updatearticle_on_snf(id: number): void {
    if (this.Newsartical_Form.invalid) {
      this.Newsartical_Form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.Newsartical_Form.value.name);

    const file = this.Newsartical_Form.value.imageUrl;
    if (file) {
      formData.append('imageUrl', file);
    } else {
     }

    this.service.updatearticle_on_snf(id, formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchNewsartical_Form_Data();
        alert('Record Updated successfully!');
        this.showEditForm = false;
        this.resetForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deletearticle_on_snf(id: number | undefined): void {
    if (!id || id <= 0) {
      console.error('Invalid ID for delete operation:', id);
      return;
    }
  
    // Ask for confirmation before deleting
    const confirmed = confirm('Are you sure you want to delete this article?');
  
    if (confirmed) {
      this.service.deletearticle_on_snf(id).subscribe(
        () => {
          console.log('Article deleted successfully');
          this.Newsartical_Form_Data = this.Newsartical_Form_Data.filter((item: any) => item.id !== id);
          this.selectedItem = { _id: '', name: '', imageUrl: '' };
          this.Newsartical_Form.reset();
          this.showAddForm = false;
          // Show success alert
          alert('Article deleted successfully!');
          this.fetchNewsartical_Form_Data();
        },
        (error) => {
          console.error('Error deleting article:', error);
        }
      );
    }
  }
  

  getFileName(url: string): string {
    return url.split('/').pop() || '';
  }
}