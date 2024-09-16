import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredCarrosalData: any[] = [];
  searchQuery: string = '';
  pageSize: number = 10;
  pageIndex: number = 0;
  StateForm!: FormGroup;
  StateData: any;
  selectedItem: any = { _id: 0, name: '', imageUrl: '',position:'' };
  showAddForm: boolean = false;
  showEditForm: boolean = false;

  constructor(
    private service: ServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchStateData();
  }

  initializeForm(): void {
    this.StateForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],

      imageUrl: [null]
    });
  }

  fetchStateData(): void {
    this.service.getnationwidesupport().subscribe(
      (response) => {
        console.log(response);
        this.StateData = response;
        this.filterData();
        this.StateData.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  filterData() {
    const query = this.searchQuery.toLowerCase();
    this.filteredCarrosalData = this.StateData.filter((item: { name: string; }) => 
      item.name.toLowerCase().includes(query)
    );
    // this.filteredCarrosalData.sort((a, b) => b.id - a.id);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  onSearchChange() {
    this.filterData();
  }

  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.StateForm.patchValue({ imageUrl: file });

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
    this.StateForm.patchValue({
      name: item.name,
      position: item.position,

      imageUrl: null  // Reset image file input when editing
    });
  }

  resetForm(): void {
    this.StateForm.reset();
    this.StateForm.markAsUntouched();
    this.StateForm.markAsPristine();
  }

  addStateTeamItem(): void {
    if (this.StateForm.invalid) {
      this.StateForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.StateForm.value.name);
    formData.append('position', this.StateForm.value.position);

    if (this.StateForm.value.imageUrl) {
      formData.append('imageUrl', this.StateForm.value.imageUrl);
    } else {
      this.StateForm.controls['imageUrl'].setErrors({ required: true });
      return;
    }

    this.service.addnationwidesupport(formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchStateData();
        alert('Record Added successfully!');
        this.showAddForm = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateStateItem(id: number,event:Event): void {
    if (this.StateForm.invalid) {
      this.StateForm.markAllAsTouched();
      return;
    }
    debugger
    const formData = new FormData();
    formData.append('name', this.StateForm.value.name);
    if (this.StateForm.value.imageUrl) {
      formData.append('imageUrl', this.StateForm.value.imageUrl);
    } else {
    }

    this.service.updatenationwidesupport(id, formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchStateData();
        alert('Record Updated successfully!');
        this.showEditForm = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteStateItem(id: number): void { // ID type changed to number
    const confirmed = confirm('Are you sure you want to delete this Well-Wisher?');
    if (confirmed) {
    this.service.deletenationwidesupport(id).subscribe(
      (response) => {
        console.log(response);
        alert('Well-Wisher deleted successfully!');
        this.fetchStateData();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  }
  getFileName(url: string): string {
    return url.split('/').pop() || '';
  }
}
