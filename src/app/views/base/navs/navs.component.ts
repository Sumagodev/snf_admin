import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-navs',
  templateUrl: './navs.component.html',
  styleUrls: ['./navs.component.scss']
})

export class NavsComponent implements OnInit {
  Project_Health_MedicalProjects_Form!: FormGroup;
  Project_Health_MedicalProjects_Data: any;
  selectedItem: any = { _id: '', name: '', imageUrl: '' };
  showAddForm: boolean = false;
  showEditForm: boolean = false;

  constructor(
    private service: ServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchProject_Health_MedicalProjects_Data();
  }

  initializeForm(): void {
    this.Project_Health_MedicalProjects_Form = this.fb.group({
      name: ['', Validators.required],
      image: [null]
    });
  }

  fetchProject_Health_MedicalProjects_Data() {
    this.service.getOnGoingProject_Health_MedicalProjects().subscribe(
      (response) => {
        console.log(response);
        this.Project_Health_MedicalProjects_Data = response;
      }
    );
  }

  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.Project_Health_MedicalProjects_Form.patchValue({ image: file });
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
    this.Project_Health_MedicalProjects_Form.reset();
    this.Project_Health_MedicalProjects_Form.markAsUntouched();
    this.Project_Health_MedicalProjects_Form.markAsPristine();
  }

  addOnGoingProject_Health_MedicalProjects(): void {
    const formData = new FormData();
    formData.append('name', this.Project_Health_MedicalProjects_Form.value.name);
    formData.append('image', this.Project_Health_MedicalProjects_Form.value.image);

    this.service.addOnGoingProject_Health_MedicalProjects(formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchProject_Health_MedicalProjects_Data();
        this.showAddForm = false;
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateOnGoingProject_Health_MedicalProjects(id: number): void {
    const formData = new FormData();
    formData.append('name', this.Project_Health_MedicalProjects_Form.value.name);
    formData.append('image', this.Project_Health_MedicalProjects_Form.value.image);

    this.service.updateOnGoingProject_Health_MedicalProjects(id, formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchProject_Health_MedicalProjects_Data();
        this.showEditForm = false;
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteOnGoingProject_Health_MedicalProjects(id: number): void {
    this.service.deleteOnGoingProject_Health_MedicalProjects(id).subscribe(
      (response) => {
        console.log(response);
        this.fetchProject_Health_MedicalProjects_Data();
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
