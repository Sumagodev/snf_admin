import { Component ,OnInit} from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';


import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-form-controls',
  templateUrl: './form-controls.component.html',
  styleUrls: ['./form-controls.component.scss']
})
// export class FormControlsComponent {

//   public favoriteColor = '#26ab3c';
// showAddForm: any;

//   constructor() { }

// }

export class FormControlsComponent implements OnInit {
  NewsForm!: FormGroup;
  NewsData: any;
  selectedItem: any = { _id: '', name: '', imageUrl: '' };
  showAddForm: boolean = false;
  showEditForm: boolean = false;

  constructor(
    private service: ServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchCarrosalData();
  }

  initializeForm(): void {
    this.NewsForm = this.fb.group({
      name: ['', Validators.required],
      image: [null]
    });
  }

  fetchCarrosalData() {
    this.service.getCarrosalData().subscribe(
      (response) => {
        console.log(response);
        this.NewsData = response;
      }
    );
  }

  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.NewsForm.patchValue({ image: file });
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
    this.NewsForm.reset();
    this.NewsForm.markAsUntouched();
    this.NewsForm.markAsPristine();
  }

  addCarrosalItem(): void {
    const formData = new FormData();
    formData.append('name', this.NewsForm.value.name);
    formData.append('image', this.NewsForm.value.image);

    this.service.addCarrosalItem(formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchCarrosalData();
        this.showAddForm = false;
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateCarrosalItem(id: number): void {
    const formData = new FormData();
    formData.append('name', this.NewsForm.value.name);
    formData.append('image', this.NewsForm.value.image);

    this.service.updateCarrosalItem(id, formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchCarrosalData();
        this.showEditForm = false;
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteCarrosalItem(id: number): void {
    this.service.deleteCarrosalItem(id).subscribe(
      (response) => {
        console.log(response);
        this.fetchCarrosalData();
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
