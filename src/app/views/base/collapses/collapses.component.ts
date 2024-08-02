import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-collapses',
  templateUrl: './collapses.component.html',
  styleUrls: ['./collapses.component.scss']
})
export class CollapsesComponent implements OnInit {
  Project_Shahid_Jawan_Fund_Form!: FormGroup;
  Project_Shahid_Jawan_Fund_Data: any;
  selectedItem: any = { _id: '', name: '', imageUrl: '' };
  showAddForm: boolean = false;
  showEditForm: boolean = false;

  constructor(
    private service: ServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchProject_Shahid_Jawan_Fund_Data();
  }

  initializeForm(): void {
    this.Project_Shahid_Jawan_Fund_Form = this.fb.group({
      name: ['', Validators.required],
      image: [null]
    });
  }

  fetchProject_Shahid_Jawan_Fund_Data() {
    this.service.getOnGoingProject_Shahid_Jawan_Fund().subscribe(
      (response) => {
        console.log(response);
        this.Project_Shahid_Jawan_Fund_Data = response;
      }
    );
  }

  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.Project_Shahid_Jawan_Fund_Form.patchValue({ image: file });
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
    this.Project_Shahid_Jawan_Fund_Form.reset();
    this.Project_Shahid_Jawan_Fund_Form.markAsUntouched();
    this.Project_Shahid_Jawan_Fund_Form.markAsPristine();
  }

  addOnGoingProject_Shahid_Jawan_Fund(): void {
    const formData = new FormData();
    formData.append('name', this.Project_Shahid_Jawan_Fund_Form.value.name);
    formData.append('image', this.Project_Shahid_Jawan_Fund_Form.value.image);

    this.service.addOnGoingProject_Shahid_Jawan_Fund(formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchProject_Shahid_Jawan_Fund_Data();
        this.showAddForm = false;
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateOnGoingProject_Shahid_Jawan_Fund(id: number): void {
    const formData = new FormData();
    formData.append('name', this.Project_Shahid_Jawan_Fund_Form.value.name);
    formData.append('image', this.Project_Shahid_Jawan_Fund_Form.value.image);

    this.service.updateOnGoingProject_Shahid_Jawan_Fund(id, formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchProject_Shahid_Jawan_Fund_Data();
        this.showEditForm = false;
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteOnGoingProject_Shahid_Jawan_Fund(id: number): void {
    this.service.deleteOnGoingProject_Shahid_Jawan_Fund(id).subscribe(
      (response) => {
        console.log(response);
        this.fetchProject_Shahid_Jawan_Fund_Data();
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
