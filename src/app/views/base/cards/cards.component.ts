// cards.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  Imp_SNF_Project_Form!: FormGroup;
  Imp_SNF_Project_Data: any;
  selectedItem: any = { _id: '', para: '' };
  showAddForm: boolean = false;
  showEditForm: boolean = false;

  constructor(
    private service: ServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchImp_SNF_Project_Data();
  }

  initializeForm(): void {
    this.Imp_SNF_Project_Form = this.fb.group({
      para: ['', Validators.required],
    });
  }

  fetchImp_SNF_Project_Data() {
    this.service.getImportant_SNF_Project_para().subscribe(
      (response) => {
        console.log(response);
        this.Imp_SNF_Project_Data = response;
      }
    );
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
    this.Imp_SNF_Project_Form.reset();
    this.Imp_SNF_Project_Form.markAsUntouched();
    this.Imp_SNF_Project_Form.markAsPristine();
  }

  addImportant_SNF_Project_para(): void {
    const para = this.Imp_SNF_Project_Form.value.para;
    this.service.addImportant_SNF_Project_para(para).subscribe(
      (response) => {
        console.log(response);
        this.fetchImp_SNF_Project_Data();
        this.showAddForm = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateImportant_SNF_Project_para(id: string): void {
    const para = this.Imp_SNF_Project_Form.value.para;
    this.service.updateImportant_SNF_Project_para(id, para).subscribe(
      (response) => {
        console.log(response);
        this.fetchImp_SNF_Project_Data();
        this.showEditForm = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteImportant_SNF_Project_para(id: string): void {
    this.service.deleteImportant_SNF_Project_para(id).subscribe(
      (response) => {
        console.log(response);
        this.fetchImp_SNF_Project_Data();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
