import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-placeholders',
  templateUrl: './placeholders.component.html',
  styleUrls: ['./placeholders.component.scss']
})

export class PlaceholdersComponent implements OnInit {
  Project_Sport_Projects_Form!: FormGroup;
  Project_Sport_Projects_Data: any;
  selectedItem: any = { _id: '', name: '', imageUrl: '' };
  showAddForm: boolean = false;
  showEditForm: boolean = false;

  constructor(
    private service: ServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchProject_Sport_Projects_Data();
  }

  initializeForm(): void {
    this.Project_Sport_Projects_Form = this.fb.group({
      name: ['', Validators.required],
      image: [null]
    });
  }

  fetchProject_Sport_Projects_Data() {
    this.service.getOnGoingProject_Sport_Projects().subscribe(
      (response) => {
        console.log(response);
        this.Project_Sport_Projects_Data = response;
      }
    );
  }

  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.Project_Sport_Projects_Form.patchValue({ image: file });
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
    this.Project_Sport_Projects_Form.reset();
    this.Project_Sport_Projects_Form.markAsUntouched();
    this.Project_Sport_Projects_Form.markAsPristine();
  }

  addOnGoingProject_Sport_Projects(): void {
    const formData = new FormData();
    formData.append('name', this.Project_Sport_Projects_Form.value.name);
    formData.append('image', this.Project_Sport_Projects_Form.value.image);

    this.service.addOnGoingProject_Sport_Projects(formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchProject_Sport_Projects_Data();
        this.showAddForm = false;
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateOnGoingProject_Sport_Projects(id: number): void {
    const formData = new FormData();
    formData.append('name', this.Project_Sport_Projects_Form.value.name);
    formData.append('image', this.Project_Sport_Projects_Form.value.image);

    this.service.updateOnGoingProject_Sport_Projects(id, formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchProject_Sport_Projects_Data();
        this.showEditForm = false;
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteOnGoingProject_Sport_Projects(id: number): void {
    this.service.deleteOnGoingProject_Sport_Projects(id).subscribe(
      (response) => {
        console.log(response);
        this.fetchProject_Sport_Projects_Data();
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

