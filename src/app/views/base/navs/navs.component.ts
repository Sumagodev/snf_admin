import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-navs',
  templateUrl: './navs.component.html',
  styleUrls: ['./navs.component.scss']
})
export class NavsComponent implements OnInit {
@ViewChild(MatPaginator) paginator!: MatPaginator;
filteredCarrosalData: any[] = [];
searchQuery: string = '';
pageSize: number = 10;
pageIndex: number = 0;
upcomingproject_Form!: FormGroup;
upcomingProject_Data: any;
filteredProjects: any;
selectedItem: any = { id: '',infoTitle: '', category: '', infoDescription: '' };
categories: any[] = [];
selectedCategory: string = '';
showAddForm: boolean = false;
showEditForm: boolean = false;
fileError: string = '';
data: any;

constructor(
  private service: ServiceService,
  private fb: FormBuilder
) { }

ngOnInit(): void {
  this.initializeForm();
  this.fetchupcomingProject_Data();
  this.fetchCategories();
}

initializeForm(): void {
  this.upcomingproject_Form = this.fb.group({
    infoTitle: ['', Validators.required],
    category: ['', Validators.required],
   infoDescription: ['', Validators.required],
  });
}

fetchupcomingProject_Data(): void {
  this.service.getOnGoingProject_Health_MedicalProjects().subscribe(
    (response) => {
      console.log(response);
      this.data = response;
      this.filterData();
      // this.data.sort((a:any, b: any) => b.id - a.id);
      console.log(this.data);
      // this.filterProjects();
     
      
    },
    (error) => {
      console.error(error);
    }
  );
}

filterData() {
  const query = this.searchQuery.toLowerCase();
  this.filteredCarrosalData = this.data.filter((item: { category: string; }) => 
    item.category.toLowerCase().includes(query)
  );
  this.filteredCarrosalData.sort((a, b) => b.id - a.id);
  console.log(this.filteredCarrosalData);
  
}

onPageChange(event: PageEvent) {
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
}

onSearchChange() {
  this.filterData();
}

fetchCategories(): void {
  this.service.getProject().subscribe(
    (response) => {
      console.log(response);
      this.categories = response;
    },
    (error) => {
      console.error(error);
    }
  );
}

onFileChange(event: any): void {
  const file = (event.target as HTMLInputElement)?.files?.[0];
  if (file) {
    this.upcomingproject_Form.patchValue({
      images: file
    });
    this.fileError = '';
  } else {
    this.fileError = 'Image file is required.';
  }
}

onCategoryChange(event: any): void {
  this.selectedCategory = event.target.value;
  this.filterProjects();
}

filterProjects(): void {
  if (this.selectedCategory) {
    this.filteredProjects = this.data.filter(
      (project: any) => project.categoryId === this.selectedCategory
    );
  } else {
    this.filteredProjects = this.data;
  }
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

  this.upcomingproject_Form.patchValue({
    imageTitles: item.ProjectTitle,
 
    category: item.category,
    images: null
  });
}

resetForm(): void {
  this.upcomingproject_Form.reset();
  this.upcomingproject_Form.markAsUntouched();
  this.upcomingproject_Form.markAsPristine();
  this.fileError = '';
}

addupcomingproject(event: Event): void {
  event.preventDefault();


  const formData = new FormData();
  formData.append('infoTitle', this.upcomingproject_Form.value.infoTitle);
 
  formData.append('category', this.upcomingproject_Form.value.category);
  formData.append('infoDescription', this.upcomingproject_Form.value.infoDescription);

  this.service.addOnGoingProject_Health_MedicalProjects(formData).subscribe(
    (response) => {
      console.log(response);
      this.fetchupcomingProject_Data();
      alert('Record Added successfully!');
      this.showAddForm = false;
    },
    (error) => {
      console.error(error);
    }
  );
}

updateUpcomingProject(id: number, event: Event): void {
  event.preventDefault();
  if (this.upcomingproject_Form.invalid) {
    this.upcomingproject_Form.markAllAsTouched();
    this.fileError = this.upcomingproject_Form.get('images')?.value ? '' : 'Image file is required.';
    return;
  }

  const formData = new FormData();
  formData.append('imageTitles', this.upcomingproject_Form.value.imageTitles);

  formData.append('category', this.upcomingproject_Form.value.category);

  if (this.upcomingproject_Form.value.mainImageUrl) {
    formData.append('images', this.upcomingproject_Form.value.images);
  } else {
  }

  this.service.updateupcomingimage(id, formData).subscribe(
    (response) => {
      console.log(response);
      this.fetchupcomingProject_Data();
      alert('Record Updated successfully!');
      this.showEditForm = false;
      this.resetForm();
    },
    (error) => {
      console.error(error);
    }
  );
}

deleteupcomingproject(id: number): void {
  // Ask for confirmation before deleting
  const confirmed = confirm('Are you sure you want to delete this Ongoing project?');

  if (confirmed) {
    this.service.deleteupcomingimage(id).subscribe(
      (response) => {
        console.log(response);
        this.fetchupcomingProject_Data();
        this.upcomingproject_Form.reset();
        // Show success alert
        alert('Ongoing project deleted successfully!');
      },
      (error) => {
        console.error('Error deleting upcoming project:', error);
      }
    );
  }
}


getFileName(url: string): string {
  return url.split('/').pop() || '';
}
}
// export class NavsComponent implements OnInit {
//   Project_Health_MedicalProjects_Form!: FormGroup;
//   Project_Health_MedicalProjects_Data: any;
//   selectedItem: any = { id: '', category: '', infoTitles: '',infoDescriptions:'' };
//   showAddForm: boolean = false;
//   showEditForm: boolean = false;
//   categories: any;

//   constructor(
//     private service: ServiceService,
//     private fb: FormBuilder
//   ) { }

//   ngOnInit(): void {
//     this.initializeForm();
//     this.fetchProject_Health_MedicalProjects_Data();
//     this.fetchCategories();
//   }

// // initializeForm(): void {
// //   this.Project_Health_MedicalProjects_Form = this.fb.group({
// //     category: ['', Validators.required],
// //     infoTitles: ['', Validators.required],
// //     infoDescriptions: ['', Validators.required],
// //   });
// // }
// initializeForm(): void {
//   this.Project_Health_MedicalProjects_Form = this.fb.group({
//        infoTitles: ['', Validators.required],
//     infoDescriptions: ['', Validators.required],
//     category: ['', Validators.required],
   
//   });
// }

//   fetchProject_Health_MedicalProjects_Data() {
//     this.service.getOnGoingProject_Health_MedicalProjects().subscribe(
//       (response) => {
//         console.log(response);
//         this.Project_Health_MedicalProjects_Data = response;
//       }
//     );
//   }
//   fetchCategories(): void {
//     this.service.getProject().subscribe(
//       (response) => {
//         console.log(response);
//         this.categories = response;
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }
//   // onFileChange(event: any): void {
//   //   const file = (event.target as HTMLInputElement)?.files?.[0];
//   //   this.Project_Health_MedicalProjects_Form.patchValue({ image: file });
//   // }

//   toggleAddForm(): void {
//     this.showAddForm = true;
//     this.showEditForm = false;
//     this.resetForm();
//   }

//   toggleEditForm(item: any): void {
//     this.selectedItem = { ...item };
//     this.showEditForm = true;
//     this.showAddForm = false;
//   }

//   resetForm(): void {
//     this.Project_Health_MedicalProjects_Form.reset();
//     this.Project_Health_MedicalProjects_Form.markAsUntouched();
//     this.Project_Health_MedicalProjects_Form.markAsPristine();
//   }

//   addOnGoingProject_Health_MedicalProjects(): void {
//     const formData = new FormData();
//     formData.append('category', this.Project_Health_MedicalProjects_Form.value.category);
//     formData.append('infoTitles', this.Project_Health_MedicalProjects_Form.value.infoTitles);
//     formData.append('infoDescriptions', this.Project_Health_MedicalProjects_Form.value.infoDescriptions);
// console.log(formData, "formDataformDataformData");
//     this.service.addOnGoingProject_Health_MedicalProjects(formData).subscribe(
//       (response) => {
//         console.log(response);
//         console.log(formData, "formDataformDataformData");
//         this.fetchProject_Health_MedicalProjects_Data();
//         this.showAddForm = false;
//         location.reload();
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }

//   updateOnGoingProject_Health_MedicalProjects(id: number): void {
//     const formData = new FormData();
//     formData.append('infoTitles', this.Project_Health_MedicalProjects_Form.value.infoTitles);
//     formData.append('infoDescriptions', this.Project_Health_MedicalProjects_Form.value.infoDescriptions);

//     this.service.updateOnGoingProject_Health_MedicalProjects(id, formData).subscribe(
//       (response) => {
//         console.log(response);
//         this.fetchProject_Health_MedicalProjects_Data();
//         this.showEditForm = false;
//         location.reload();
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }

//   deleteOnGoingProject_Health_MedicalProjects(id: number): void {
//     this.service.deleteOnGoingProject_Health_MedicalProjects(id).subscribe(
//       (response) => {
//         console.log(response);
//         this.fetchProject_Health_MedicalProjects_Data();
//         location.reload();
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }
// }
