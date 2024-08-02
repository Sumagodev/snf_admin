import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-tooltips',
  templateUrl: './tooltips.component.html',
  styleUrls: ['./tooltips.component.scss']
})
export class TooltipsComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredCarrosalData: any[] = [];
  searchQuery: string = '';
  pageSize: number = 10;
  pageIndex: number = 0;
  upcomingproject_Form!: FormGroup;
  upcomingProject_Data: any;
  filteredProjects: any;
  selectedItem: any = { id: '',imageTitles: '', category: '', images: '' };
  categories: any[] = [];
  selectedCategory: string = '';
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  fileError: string = '';
  data: any;

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
      imageTitles: ['', Validators.required],
      category: ['', Validators.required],
      images: [null]
    });
  }

  fetchupcomingProject_Data(): void {
    this.service.getupcomingimage().subscribe(
      (response) => {
        console.log(response);
        this.data = response;
        this.filterData();
        // this.data.sort((a:any, b: any) => b.id - a.id);
        console.log(this.data);
        // this.filterProjects();
       
        
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  filterData() {
    const query = this.searchQuery.toLowerCase();
    this.filteredCarrosalData = this.data.filter((item: { category: string; }) => 
      item.category.toLowerCase().includes(query)
    );
    this.filteredCarrosalData.sort((a, b) => b.id - a.id);
    console.log(this.filteredCarrosalData);
    
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
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
        images: file
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
      this.filteredProjects = this.data.filter(
        (project: any) => project.categoryId === this.selectedCategory
      );
    } else {
      this.filteredProjects = this.data;
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
      imageTitles: item.ProjectTitle,
   
      category: item.category,
      images: null
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
      this.fileError = this.upcomingproject_Form.get('images')?.value ? '' : 'Image file is required.';
      return;
    }

    const formData = new FormData();
    formData.append('imageTitles', this.upcomingproject_Form.value.imageTitles);
   
    formData.append('category', this.upcomingproject_Form.value.category);
    formData.append('images', this.upcomingproject_Form.value.images);

    this.service.addupcomingimage(formData).subscribe(
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
      this.fileError = this.upcomingproject_Form.get('images')?.value ? '' : 'Image file is required.';
      return;
    }

    const formData = new FormData();
    formData.append('imageTitles', this.upcomingproject_Form.value.imageTitles);

    formData.append('category', this.upcomingproject_Form.value.category);

    if (this.upcomingproject_Form.value.mainImageUrl) {
      formData.append('images', this.upcomingproject_Form.value.images);
    } else {
    }

    this.service.updateupcomingimage(id, formData).subscribe(
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
    // Ask for confirmation before deleting
    const confirmed = confirm('Are you sure you want to delete this Ongoing project?');
  
    if (confirmed) {
      this.service.deleteupcomingimage(id).subscribe(
        (response) => {
          console.log(response);
          this.fetchupcomingProject_Data();
          this.upcomingproject_Form.reset();
          // Show success alert
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
