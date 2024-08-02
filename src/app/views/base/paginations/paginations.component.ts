import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-paginations',
  templateUrl: './paginations.component.html',
  styleUrls: ['./paginations.component.scss']
})

export class PaginationsComponent implements OnInit {
  Project_Environmental_Conservation_Form!: FormGroup;
  Project_Environmental_Conservation_Data: any;
  selectedItem: any = { _id: '', name: '', imageUrl: '' };
  showAddForm: boolean = false;
  showEditForm: boolean = false;

  constructor(
    private service: ServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchProject_Environmental_Conservation_Data();
  }

  initializeForm(): void {
    this.Project_Environmental_Conservation_Form = this.fb.group({
      name: ['', Validators.required],
      image: [null]
    });
  }

  fetchProject_Environmental_Conservation_Data() {
    this.service.getOnGoingProject_Environmental_Conservation().subscribe(
      (response) => {
        console.log(response);
        this.Project_Environmental_Conservation_Data = response;
      }
    );
  }

  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.Project_Environmental_Conservation_Form.patchValue({ image: file });
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
    this.Project_Environmental_Conservation_Form.reset();
    this.Project_Environmental_Conservation_Form.markAsUntouched();
    this.Project_Environmental_Conservation_Form.markAsPristine();
  }

  addOnGoingProject_Environmental_Conservation(): void {
    const formData = new FormData();
    formData.append('name', this.Project_Environmental_Conservation_Form.value.name);
    formData.append('image', this.Project_Environmental_Conservation_Form.value.image);

    this.service.addOnGoingProject_Environmental_Conservation(formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchProject_Environmental_Conservation_Data();
        this.showAddForm = false;
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateOnGoingProject_Environmental_Conservation(id: number): void {
    const formData = new FormData();
    formData.append('name', this.Project_Environmental_Conservation_Form.value.name);
    formData.append('image', this.Project_Environmental_Conservation_Form.value.image);

    this.service.updateOnGoingProject_Environmental_Conservation(id, formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchProject_Environmental_Conservation_Data();
        this.showEditForm = false;
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteOnGoingProject_Environmental_Conservation(id: number): void {
    this.service.deleteOnGoingProject_Environmental_Conservation(id).subscribe(
      (response) => {
        console.log(response);
        this.fetchProject_Environmental_Conservation_Data();
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
