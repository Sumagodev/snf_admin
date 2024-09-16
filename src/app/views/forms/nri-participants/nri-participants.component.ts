import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-nri-participants',
  templateUrl: './nri-participants.component.html',
  styleUrl: './nri-participants.component.scss'
})
export class NriParticipantsComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredCarrosalData: any[] = [];
  searchQuery: string = '';
  pageSize: number = 10;
  pageIndex: number = 0;

  NriForm!: FormGroup;
  NriData: any;
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
    this.fetchNriData();
  }


  initializeForm(): void {
    this.NriForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],

      imageUrl: [null, Validators.required]
    });
  }
  fetchNriData() {
    this.service.getNRI_Participants().subscribe(
      (response) => {
        console.log(response);
        this.NriData = response;
        this.filterData();
        // this.NriData.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
      }
    );
  }

  filterData() {
    const query = this.searchQuery.toLowerCase();
    this.filteredCarrosalData = this.NriData.filter((item: { name: string; }) => 
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
    this.NriForm.patchValue({ imageUrl: file });
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
    this.NriForm.patchValue({
      name:item.name,
      position:item.position,

      imageurl:item.imageUrl
    })
  }

  resetForm(): void {
    this.NriForm.reset();
    this.NriForm.markAsUntouched();
    this.NriForm.markAsPristine();
  }

  addNriTeamItem(): void {
    const formData = new FormData();
    formData.append('name', this.NriForm.value.name);
    formData.append('position', this.NriForm.value.position);

    formData.append('imageUrl', this.NriForm.value.imageUrl);

    this.service.addNRI_Participants(formData).subscribe(
      (response) => {
        console.log(response);
        this.fetchNriData();
        alert('Record Added successfully!'); 
        this.showAddForm = false;
        //location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateNriItem(id: number,event:Event): void {
    event.preventDefault();
    if (this.NriForm.invalid) {
   this.NriForm.markAllAsTouched();
   return;
 }

 const formData = new FormData();
 formData.append('name', this.NriForm.value.name);
 formData.append('position', this.NriForm.value.position);

if (this.NriForm.value.imageUrl instanceof File) {
   formData.append('imageUrl', this.NriForm.value.imageUrl);
 } else {
 }

 this.service.updateNRI_Participants(id, formData).subscribe(
   (response) => {
     console.log(response);
     this.fetchNriData();
     alert('Record Updated successfully!');
     this.showEditForm = false;

   },
   (error) => {
     console.error(error);
   }
 );
}

  deleteNriItem(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this NRI?');
    if (confirmed) {
    this.service.deleteNRI_Participants(id).subscribe(
      (response) => {
        console.log(response);
        this.fetchNriData();
        alert('NRI-participants deleted successfully!');
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