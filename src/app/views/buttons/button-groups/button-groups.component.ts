import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/Service/service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-button-groups',
  templateUrl: './button-groups.component.html',
  styleUrls: ['./button-groups.component.scss']
})

export class ButtonGroupsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  snf_in_news_papers_Form!: FormGroup;
  snf_in_news_papers_Data: any;
  selectedItem: any = { _id: '', name: '', imageUrl: '' };
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
    this.fetchsnf_in_news_papers_Data();
  }

  initializeForm(): void {
    this.snf_in_news_papers_Form = this.fb.group({
      name: ['', Validators.required],
      imageUrl: [null, Validators.required]
    });
  }

  fetchsnf_in_news_papers_Data() {
    this.service.getsnf_in_news_papers().subscribe(
      (response) => {
        console.log(response);
        this.snf_in_news_papers_Data = response;
        this.filterData();
        // this.snf_in_news_papers_Data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
      }
    );
  }
  filterData() {
    const query = this.searchQuery.toLowerCase();
    this.filteredCarrosalData = this.snf_in_news_papers_Data.filter((item: { name: string; }) => 
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
    this.snf_in_news_papers_Form.patchValue({
      imageUrl: file // Store the file object in the form
    });
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

    this.snf_in_news_papers_Form.patchValue({
      name: item.name,
      imageurl :item.imageUrl
    });
  }

  resetForm(): void {
    this.snf_in_news_papers_Form.reset();
    this.snf_in_news_papers_Form.markAsUntouched();
    this.snf_in_news_papers_Form.markAsPristine();
    this.selectedItem = { _id: '', name: '', imageUrl: '' }; 
  }

  addsnf_in_news_papers(): void {
    if (this.snf_in_news_papers_Form.valid) {
      const formData = new FormData();
      formData.append('name', this.snf_in_news_papers_Form.value.name);
      const file = this.snf_in_news_papers_Form.value.imageUrl;
   
      if (!file) {
        console.error('Image file is not selected');
        return;
      }

      formData.append('imageUrl', file);

      this.service.addsnf_in_news_papers(formData).subscribe(
        (response) => {
          console.log(response);
          this.fetchsnf_in_news_papers_Data();
          alert('Record Added successfully!'); 
          this.toggleAddForm();
          this.showAddForm = false;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  // updatesnf_in_news_papers(id: number, event: Event): void {
  //   if (this.snf_in_news_papers_Form.valid) {
  //     const formData = new FormData();
  //     formData.append('name', this.snf_in_news_papers_Form.value.name);
  //     const file = this.snf_in_news_papers_Form.value.imageUrl;
  
  //     // Check if an image file is selected
  //     if (file instanceof File) {
  //       formData.append('imageUrl', file);
  //     }
  
  //     this.service.updatesnf_in_news_papers(id, formData).subscribe(
  //       (response) => {
  //         console.log(response);
  //         this.fetchsnf_in_news_papers_Data(); // Refresh data after update
  //         this.showEditForm = false;
  //         this.resetForm(); // Reset form after successful update
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   }
  // }
  updatesnf_in_news_papers(id: number, event: Event): void {
    event.preventDefault();
    if (this.snf_in_news_papers_Form.invalid) {
      this.snf_in_news_papers_Form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.snf_in_news_papers_Form.value.name);

    // Check if a new image file is selected
    if (this.snf_in_news_papers_Form.value.imageUrl instanceof File) {
      formData.append('imageUrl', this.snf_in_news_papers_Form.value.imageUrl);
    } else {
    }

    this.service.updatesnf_in_news_papers(id, formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchsnf_in_news_papers_Data();
        alert('Record Updated successfully!');
        this.showEditForm = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deletesnf_in_news_papers(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this Home News ?');
    if (confirmed) {
    this.service.deletesnf_in_news_papers(id).subscribe(
      (response) => {
        console.log(response);
        this.fetchsnf_in_news_papers_Data();
        alert('Home News deleted successfully!');
        this.snf_in_news_papers_Form.reset();
        
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