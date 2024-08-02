// import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { ServiceService } from 'src/app/Service/service.service';

// @Component({
//   selector: 'app-carousels',
//   templateUrl: './carousels.component.html',
//   styleUrls: ['./carousels.component.scss']
// })
// export class CarouselsComponent implements OnInit {
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   filteredCarrosalData: any[] = [];
//   searchQuery: string = '';
//   pageSize: number = 10;
//   pageIndex: number = 0;
//   upcomingproject_Form!: FormGroup;
//   upcomingProject_Data: any;
//   filteredProjects: any;
//   selectedItem: any = { id: '', ProjectTitle: '', Paragraph: '', category: '', mainImage: '' };
//   categories: any[] = [];
//   selectedCategory: string = '';
//   showAddForm: boolean = false;
//   showEditForm: boolean = false;
//   fileError: string = '';

//   constructor(
//     private service: ServiceService,
//     private fb: FormBuilder
//   ) { }

//   ngOnInit(): void {
//     this.initializeForm();
//     this.fetchupcomingProject_Data();
//     this.fetchCategories();
//   }

//   initializeForm(): void {
//     this.upcomingproject_Form = this.fb.group({
//       ProjectTitle: ['', Validators.required],
//       Paragraph: ['', Validators.required],
//       category: ['', Validators.required],
//       mainImage: [null]
//     });
//   }

//   fetchupcomingProject_Data(): void {
//     this.service.getupcomingproject().subscribe(
//       (response) => {
//         console.log(response);
//         this.upcomingProject_Data = response;
//         this.filterData();
//         this.upcomingProject_Data.sort((a:any, b: any) => b.id - a.id);
//         this.filterProjects();
//         console.log(this.upcomingProject_Data);
        
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }
//   filterData() {
//     const query = this.searchQuery.toLowerCase();
//     this.filteredCarrosalData = this.upcomingProject_Data.filter((item: { name: string; }) => 
//       item.name.toLowerCase().includes(query)
//     );
//     this.filteredCarrosalData.sort((a, b) => b.id - a.id);
//   }

//   onPageChange(event: PageEvent) {
//     this.pageIndex = event.pageIndex;
//     this.pageSize = event.pageSize;
//   }

//   onSearchChange() {
//     this.filterData();
//   }


//   fetchCategories(): void {
//     this.service.getProject().subscribe(
//       (response) => {
//         console.log(response);
//         this.categories = response;
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }

//   onFileChange(event: any): void {
//     const file = (event.target as HTMLInputElement)?.files?.[0];
//     if (file) {
//       this.upcomingproject_Form.patchValue({
//         mainImage: file
//       });
//       this.fileError = '';
//     } else {
//       this.fileError = 'Image file is required.';
//     }
//   }

//   onCategoryChange(event: any): void {
//     this.selectedCategory = event.target.value;
//     this.filterProjects();
//   }

//   filterProjects(): void {
//     if (this.selectedCategory) {
//       this.filteredProjects = this.upcomingProject_Data.filter(
//         (project: any) => project.categoryId === this.selectedCategory
//       );
//     } else {
//       this.filteredProjects = this.upcomingProject_Data;
//     }
//   }

//   toggleAddForm(): void {
//     this.showAddForm = true;
//     this.showEditForm = false;
//     this.resetForm();
//   }

//   toggleEditForm(item: any): void {
//     this.selectedItem = { ...item };
//     this.showEditForm = true;
//     this.showAddForm = false;

//     this.upcomingproject_Form.patchValue({
//       ProjectTitle: item.ProjectTitle,
//       Paragraph: item.Paragraph,
//       category: item.category,
//       mainImage: null
//     });
//   }

//   resetForm(): void {
//     this.upcomingproject_Form.reset();
//     this.upcomingproject_Form.markAsUntouched();
//     this.upcomingproject_Form.markAsPristine();
//     this.fileError = '';
//   }

//   addupcomingproject(event: Event): void {
//     event.preventDefault();
//     if (this.upcomingproject_Form.invalid) {
//       this.upcomingproject_Form.markAllAsTouched();
//       this.fileError = this.upcomingproject_Form.get('mainImageUrl')?.value ? '' : 'Image file is required.';
//       return;
//     }

//     const formData = new FormData();
//     formData.append('ProjectTitle', this.upcomingproject_Form.value.ProjectTitle);
//     formData.append('Paragraph', this.upcomingproject_Form.value.Paragraph);
//     formData.append('category', this.upcomingproject_Form.value.category);
//     formData.append('mainImage', this.upcomingproject_Form.value.mainImage);

//     this.service.addupcomingproject(formData).subscribe(
//       (response) => {
//         console.log(response);
//         this.fetchupcomingProject_Data();
//         alert('Record Added successfully!');
//         this.showAddForm = false;
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }

//   updateUpcomingProject(id: number, event: Event): void {
//     event.preventDefault();
//     if (this.upcomingproject_Form.invalid) {
//       this.upcomingproject_Form.markAllAsTouched();
//       this.fileError = this.upcomingproject_Form.get('mainImageUrl')?.value ? '' : 'Image file is required.';
//       return;
//     }

//     const formData = new FormData();
//     formData.append('ProjectTitle', this.upcomingproject_Form.value.ProjectTitle);
//     formData.append('Paragraph', this.upcomingproject_Form.value.Paragraph);
//     formData.append('category', this.upcomingproject_Form.value.category);

//     if (this.upcomingproject_Form.value.mainImageUrl) {
//       formData.append('mainImage', this.upcomingproject_Form.value.mainImage);
//     } else {
//     }

//     this.service.updateupcomingproject(id, formData).subscribe(
//       (response) => {
//         console.log(response);
//         this.fetchupcomingProject_Data();
//         alert('Record Updated successfully!');
//         this.showEditForm = false;
//         this.resetForm();
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }

//   deleteupcomingproject(id: number): void {
//     // Ask for confirmation before deleting
//     const confirmed = confirm('Are you sure you want to delete this Ongoing project?');
  
//     if (confirmed) {
//       this.service.deleteupcomingproject(id).subscribe(
//         (response) => {
//           console.log(response);
//           this.fetchupcomingProject_Data();
//           this.upcomingproject_Form.reset();
//           // Show success alert
//           alert('Ongoing project deleted successfully!');
//         },
//         (error) => {
//           console.error('Error deleting upcoming project:', error);
//         }
//       );
//     }
//   }
  

//   getFileName(url: string): string {
//     return url.split('/').pop() || '';
//   }
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-carousels',
  templateUrl: './carousels.component.html',
  styleUrls: ['./carousels.component.scss']
})
export class CarouselsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredCarrosalData: any[] = [];
  searchQuery: string = '';
  pageSize: number = 10;
  pageIndex: number = 0;
  upcomingproject_Form!: FormGroup;
  upcomingProject_Data:any;

  selectedItem: any = { id: '', ProjectTitle: '', Paragraph: '',subtitle:'', category: '', mainImage: '' };
  categories: any[] = [];
  selectedCategory: string = '';
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  fileError: string = '';
  data: any[] | undefined;
  filteredProjects: any[] | undefined;

  constructor(
    private service: ServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchupcomingProject_Data();
    this.fetchCategories();
  }

  initializeForm(): void {
    this.upcomingproject_Form = this.fb.group({
      ProjectTitle: ['', Validators.required],
      Paragraph: ['', Validators.required],
      subtitle: ['', Validators.required],
      category: ['', Validators.required],
      mainImage: [null]
    });
  }

  fetchupcomingProject_Data(): void {
    this.service.getupcomingproject().subscribe(
      (response) => {
        console.log(response);
        this.upcomingProject_Data= response;
        this.filterData();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  filterData() {
    const query = this.searchQuery.toLowerCase();
    this.filteredCarrosalData = this.upcomingProject_Data.filter((item: { ProjectTitle: string; }) =>
      item.ProjectTitle.toLowerCase().includes(query)
    );
    this.filteredCarrosalData.sort((a, b) => b.id - a.id);
    console.log(this.filteredCarrosalData);
    
    // this.filterProjects();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.filterProjects();
  }

  onSearchChange() {
    this.filterData();
  }

  fetchCategories(): void {
    this.service.getProject().subscribe(
      (response) => {
        console.log(response);
        this.categories = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.upcomingproject_Form.patchValue({
        mainImage: file
      });
      this.fileError = '';
    } else {
      this.fileError = 'Image file is required.';
    }
  }

  onCategoryChange(event: any): void {
    this.selectedCategory = event.target.value;
    this.filterProjects();
  }

  filterProjects(): void {
    if (this.selectedCategory) {
      this.filteredProjects = this.upcomingProject_Data.filter(
        (project: any) => project.categoryId === this.selectedCategory
      );
    } else {
      this.filteredProjects = this.filteredCarrosalData;
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

    this.upcomingproject_Form.patchValue({
      ProjectTitle: item.ProjectTitle,
      Paragraph: item.Paragraph,
      subtitle:item.subtitle,
      category: item.category,
      mainImage: null
    });
  }

  resetForm(): void {
    this.upcomingproject_Form.reset();
    this.upcomingproject_Form.markAsUntouched();
    this.upcomingproject_Form.markAsPristine();
    this.fileError = '';
  }

  addupcomingproject(event: Event): void {
    event.preventDefault();
    if (this.upcomingproject_Form.invalid) {
      this.upcomingproject_Form.markAllAsTouched();
      this.fileError = this.upcomingproject_Form.get('mainImageUrl')?.value ? '' : 'Image file is required.';
      return;
    }

    const formData = new FormData();
    formData.append('ProjectTitle', this.upcomingproject_Form.value.ProjectTitle);
    formData.append('Paragraph', this.upcomingproject_Form.value.Paragraph);
    formData.append('subtitle', this.upcomingproject_Form.value.subtitle);
    formData.append('category', this.upcomingproject_Form.value.category);
    formData.append('mainImage', this.upcomingproject_Form.value.mainImage);

    this.service.addupcomingproject(formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchupcomingProject_Data();
        alert('Record Added successfully!');
        this.showAddForm = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateUpcomingProject(id: number, event: Event): void {
    event.preventDefault();
    if (this.upcomingproject_Form.invalid) {
      this.upcomingproject_Form.markAllAsTouched();
      this.fileError = this.upcomingproject_Form.get('mainImageUrl')?.value ? '' : 'Image file is required.';
      return;
    }

    const formData = new FormData();
    formData.append('ProjectTitle', this.upcomingproject_Form.value.ProjectTitle);
    formData.append('Paragraph', this.upcomingproject_Form.value.Paragraph);
    formData.append('subtitle', this.upcomingproject_Form.value.subtitle);
    formData.append('category', this.upcomingproject_Form.value.category);

    if (this.upcomingproject_Form.value.mainImageUrl) {
      formData.append('mainImage', this.upcomingproject_Form.value.mainImage);
    }

    this.service.updateupcomingproject(id, formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchupcomingProject_Data();
        alert('Record Updated successfully!');
        this.showEditForm = false;
        this.resetForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteupcomingproject(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this Ongoing project?');

    if (confirmed) {
      this.service.deleteupcomingproject(id).subscribe(
        (response) => {
          console.log(response);
          this.fetchupcomingProject_Data();
          this.upcomingproject_Form.reset();
          alert('Ongoing project deleted successfully!');
        },
        (error) => {
          console.error('Error deleting upcoming project:', error);
        }
      );
    }
  }

  getFileName(url: string): string {
    return url.split('/').pop() || '';
  }
}
