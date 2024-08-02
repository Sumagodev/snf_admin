import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.scss']
})

export class ListGroupsComponent implements OnInit {
  Project_Educational_Facilities_Form!: FormGroup;
  Project_Educational_Facilities_Data: any;
  selectedItem: any = { _id: '', name: '', imageUrl: '' };
  showAddForm: boolean = false;
  showEditForm: boolean = false;

  constructor(
    private service: ServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchProject_Educational_Facilities_Data();
  }

  initializeForm(): void {
    this.Project_Educational_Facilities_Form = this.fb.group({
      name: ['', Validators.required],
      image: [null]
    });
  }

  fetchProject_Educational_Facilities_Data() {
    this.service.getOnGoingProject_Educational_Facilities().subscribe(
      (response) => {
        console.log(response);
        this.Project_Educational_Facilities_Data = response;
      }
    );
  }

  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.Project_Educational_Facilities_Form.patchValue({ image: file });
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
  }

  resetForm(): void {
    this.Project_Educational_Facilities_Form.reset();
    this.Project_Educational_Facilities_Form.markAsUntouched();
    this.Project_Educational_Facilities_Form.markAsPristine();
  }

  addOnGoingProject_Educational_Facilities(): void {
    const formData = new FormData();
    formData.append('name', this.Project_Educational_Facilities_Form.value.name);
    formData.append('image', this.Project_Educational_Facilities_Form.value.image);

    this.service.addOnGoingProject_Educational_Facilities(formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchProject_Educational_Facilities_Data();
        this.showAddForm = false;
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateOnGoingProject_Educational_Facilities(id: number): void {
    const formData = new FormData();
    formData.append('name', this.Project_Educational_Facilities_Form.value.name);
    formData.append('image', this.Project_Educational_Facilities_Form.value.image);

    this.service.updateOnGoingProject_Educational_Facilities(id, formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchProject_Educational_Facilities_Data();
        this.showEditForm = false;
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteOnGoingProject_Educational_Facilities(id: number): void {
    this.service.deleteOnGoingProject_Educational_Facilities(id).subscribe(
      (response) => {
        console.log(response);
        this.fetchProject_Educational_Facilities_Data();
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
