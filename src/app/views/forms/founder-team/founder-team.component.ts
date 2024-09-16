import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-founder-team',
  templateUrl: './founder-team.component.html',
  styleUrl: './founder-team.component.scss'
})
export class FounderTeamComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredCarrosalData: any[] = [];
  searchQuery: string = '';
  pageSize: number = 10;
  pageIndex: number = 0;
  FounderForm!: FormGroup;
  FounderData: any;
  selectedItem: any = { _id: '', name: '', imageUrl: '',position:'' };
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  fileError: string = '';

  constructor(
    private service: ServiceService,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.initializeForm();
    this.fetchFounderData();
  }


  initializeForm(): void {
    this.FounderForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      imageUrl: [null, Validators.required]
    });
  }
  fetchFounderData() {
    this.service.getFounderParticipants().subscribe(
      (response) => {
        console.log(response);
        this.FounderData = response;
        this.filterData();
        // this.FounderData.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
      }
    );
  }
  
filterData() {
  const query = this.searchQuery.toLowerCase();
  this.filteredCarrosalData = this.FounderData.filter((item: { name: string; }) => 
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

  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.FounderForm.patchValue({ imageUrl: file });
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
    this.FounderForm.patchValue({
      name:item.name,
      position:item.position,
      imageurl:item.imageUrl
    })
  }

  resetForm(): void {
    this.FounderForm.reset();
    this.FounderForm.markAsUntouched();
    this.FounderForm.markAsPristine();
  }

  addFounderItem(): void {
    const formData = new FormData();
    formData.append('name', this.FounderForm.value.name);
    formData.append('position', this.FounderForm.value.position);
    formData.append('imageUrl', this.FounderForm.value.imageUrl);

    this.service.addFounderParticipant(formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchFounderData();
        alert('Record Added successfully!');   
        this.showAddForm = false;
        //location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateFounderItem(id: number,event:Event): void {
    event.preventDefault();
    if (this.FounderForm.invalid) {
    this.FounderForm.markAllAsTouched();
    return;
  }
  const formData = new FormData();
  formData.append('name', this.FounderForm.value.name);
  formData.append('position', this.FounderForm.value.position);
  
  if (this.FounderForm.value.imageUrl instanceof File) {
    formData.append('imageUrl', this.FounderForm.value.imageUrl);
  } else {
  }

  this.service.updateFounderParticipant(id, formData).subscribe(
    (response) => {
      console.log(response);
      this.fetchFounderData();
      alert('Record Updated successfully!');
      this.showEditForm = false;
     // location.reload();
    },
    (error) => {
      console.error(error);
    }
  );
}

  deleteFounderItem(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this Founder?');
    if (confirmed) {
    this.service.deleteFounderParticipant(id).subscribe(
      (response) => {
        console.log(response);
        this.fetchFounderData();
        alert('Fonder deleted successfully!');
        //location.reload();
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
