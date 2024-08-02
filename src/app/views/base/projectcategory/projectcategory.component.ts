import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-project-category',
  templateUrl: './projectcategory.component.html',
})
export class ProjectComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredCarrosalData: any[] = [];
  searchQuery: string = '';
  pageSize: number = 10;
  pageIndex: number = 0;
  Project_Form!: FormGroup;
  Project_Data: any[] = [];
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  selectedItem: any = { _id: '', name: '' };

  constructor(private service: ServiceService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchProjectsData();
  }

  initializeForm(): void {
    this.Project_Form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  toggleAddForm(): void {
    this.showAddForm = true;
    this.showEditForm = false;
    this.resetForm();
  }

  toggleEditForm(item: any): void {
    this.selectedItem = item;
    this.showEditForm = true;
    this.showAddForm = false;
    this.Project_Form.patchValue({
      name: item.name,
    });
  }

  resetForm(): void {
    this.Project_Form.reset();
    this.Project_Form.markAsUntouched();
    this.Project_Form.markAsPristine();
  }

  fetchProjectsData(): void {
    this.service.getProject().subscribe(
      (response: any) => {
        this.Project_Data = response;
        this.filterData();
      },
      (error) => {
        console.error('Error fetching projects', error);
      }
    );
  }

  filterData() {
    const query = this.searchQuery.toLowerCase();
    this.filteredCarrosalData = this.Project_Data.filter((item: { name: string; }) => 
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

  addProject(event: Event): void {
    event.preventDefault();
    if (this.Project_Form.invalid) {
      this.Project_Form.markAllAsTouched();
      return;
    }

    const projectData = {
      name: this.Project_Form.value.name
    };

    this.service.addProject(projectData).subscribe(
      (response: any) => {
        console.log('API Call Success', response);
        this.Project_Data.push(response.result);
        alert('Record Added successfully!');
        this.showAddForm = false;
      },
      (error) => {
        console.error('Error adding project', error);
      }
    );
  }

  updateProject(id: number): void {
    if (this.Project_Form.invalid) {
      this.Project_Form.markAllAsTouched();
      return;
    }

    const projectData = {
      name: this.Project_Form.value.name
    };

    this.service.updateProject(id, projectData).subscribe(
      (response: any) => {
        const index = this.Project_Data.findIndex((item: { id: number }) => item.id === id);
        if (index !== -1) {
          this.Project_Data[index] = { ...this.Project_Data[index], ...response.result };
        }
        this.fetchProjectsData();
        alert('Record Updated successfully!');
        this.showEditForm = false;
        this.resetForm();
      },
      (error) => {
        console.error('Error updating project', error);
      }
    );
  }

  deleteProject(id: number): void {
   
    const confirmed = confirm('Are you sure you want to delete this project?');
  
    if (confirmed) {
      this.service.deleteProject(id).subscribe(
        () => {
          this.Project_Data = this.Project_Data.filter((item: { id: number }) => item.id !== id);
          // Show success alert
          alert('Project deleted successfully!');
        },
        (error) => {
          console.error('Error deleting project', error);
        }
      );
    }
  }
  
}