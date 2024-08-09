import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  AddNewsItem(formData: FormData) {
    throw new Error('Method not implemented.');
  }
  deleteNewsItem(id: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) { }
  // Home carrosal image API 
  private carrosalurl = 'https://snf.backend.socialforumindia.com/carrosal';
                         
  addCarrosalItem(formdata: any) {
    return this.http.post(`${this.carrosalurl}/post`, formdata);
  }

  getCarrosalData() {
    return this.http.get(`${this.carrosalurl}/get`)
  }

  updateCarrosalItem(id: number, formData: any) {
    return this.http.put(`${this.carrosalurl}/put/${id}`, formData);
  }

  deleteCarrosalItem(id: number): Observable<string> {
    const url = `${this.carrosalurl}/delete/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }
  

  // Home Home_2_Cards image API 
  private reportUrl = 'https://snf.backend.socialforumindia.com/reportRoute/';

  addreport(formdata: any) {
    return this.http.post(`${this.reportUrl}/post`, formdata);
  }

  getreport() {
    return this.http.get(`${this.reportUrl}/get`)
  }

  updatereport(id: number, formData: any) {
    return this.http.put(`${this.reportUrl}/put/${id}`, formData);
  }

  deletereport(id: number) {
    return this.http.delete(`${this.reportUrl}/delete/${id}`)

  }
      // Home Home_2_Cards image API 
  private Home_2_Cardsurl = 'https://snf.backend.socialforumindia.com/home2cards';

  add_Home_2_Cards(formdata: any) {
    return this.http.post(`${this.Home_2_Cardsurl}/post`, formdata);
  }

  get_Home_2_Cards() {
    return this.http.get(`${this.Home_2_Cardsurl}/get`)
  }

  update_Home_2_Cards(id: number, formData: any) {
    return this.http.put(`${this.Home_2_Cardsurl}/put/${id}`, formData);
  }

  delete_Home_2_Cards(id: number) {
    return this.http.delete(`${this.Home_2_Cardsurl}/delete/${id}`)

  }

  // Home Home_4_Cards image API 
  private Home_4_Cardsurl = 'https://snf.backend.socialforumindia.com/home4cards';

  add_Home_4_Cards(formdata: any) {
    return this.http.post(`${this.Home_4_Cardsurl}/post`, formdata);
  }

  get_Home_4_Cards() {
    return this.http.get(`${this.Home_4_Cardsurl}/get`)
  }

  update_Home_4_Cards(id: number, formData: any) {
    return this.http.put(`${this.Home_4_Cardsurl}/put/${id}`, formData);
  }

  // delete_Home_4_Cards(id: number) {
  //   return this.http.delete(`${this.Home_4_Cardsurl}/delete/${id}`)

  // }
  delete_Home_4_Cards(id: number): Observable<string> {
    const url = `${this.Home_4_Cardsurl}/delete/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  // Home supporter image API 
  private supporterurl = 'https://snf.backend.socialforumindia.com/supporter';

  addSupporter(formdata: any) {
    return this.http.post(`${this.supporterurl}/post`, formdata);
  }
  getSupporters() {
    return this.http.get(`${this.supporterurl}/get`)
  }
  updateSupporter(id: number, formData: FormData) {
    return this.http.put(`${this.supporterurl}/put/${id}`, formData);
  }
  
  deleteSupporter(id: number): Observable<string> {
    const url = `${this.supporterurl}/delete/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  //home media

  private mediaurl ='https://snf.backend.socialforumindia.com/homemedia';


  postHome_Media(formdata: any) {
    return this.http.post(`${this.mediaurl}/post`, formdata);
  }
  getHome_Media() {
    return this.http.get(`${this.mediaurl}/get`)
  }
  updateHome_Media(id: number, formData: FormData) {
    return this.http.put(`${this.mediaurl}/put/${id}`, formData);
  }
 
  deleteHome_Media(id: number): Observable<string> {
    const url = `${this.mediaurl}/delete/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  //Who we are -->Important_SNF_Project_para
  private Important_SNF_Project_para = 'https://snf.backend.socialforumindia.com/Important_SNF_Project_para';
  getImportant_SNF_Project_para(): Observable<any> {
    return this.http.get(this.Important_SNF_Project_para + '/get');
  }

  addImportant_SNF_Project_para(para: string): Observable<any> {
    return this.http.post(this.Important_SNF_Project_para + '/post', { para });
  }

  updateImportant_SNF_Project_para(id: string, para: string): Observable<any> {
    return this.http.put(this.Important_SNF_Project_para + `/put/${id}`, { para });
  }

  deleteImportant_SNF_Project_para(id: string): Observable<any> {
    return this.http.delete(this.Important_SNF_Project_para + `/delete/${id}`);
  }





  //Who we are --> Team SNF FounderParticipant
  private founderparticipateurl = 'https://snf.backend.socialforumindia.com/founderparticipates';
  getFounderParticipants() {
    return this.http.get(`${this.founderparticipateurl}/get`)
  }

  addFounderParticipant(formdata: any) {
    return this.http.post(`${this.founderparticipateurl}/post`, formdata);
  }
  updateFounderParticipant(id: number, formData: FormData) {
    return this.http.put(`${this.founderparticipateurl}/put/${id}`, formData);
  }
  
  deleteFounderParticipant(id: number): Observable<string> {
    const url = `${this.founderparticipateurl}/delete/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  //Who we are --> Team SNF Mentors
  private Mentorsurl = 'https://snf.backend.socialforumindia.com/mentors';
  getMentors() {
    return this.http.get(`${this.Mentorsurl}/get`)
  }
  addMentors(formdata: any) {
    return this.http.post(`${this.Mentorsurl}/post`, formdata);
  }
  updateMentors(id: number, formData: FormData) {
    return this.http.put(`${this.Mentorsurl}/put/${id}`, formData);
  }
  
  deleteMentors(id: number): Observable<string> {
    const url = `${this.Mentorsurl}/delete/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  // Who we are --> Team SNF NRI Participants
  private NRIParticipantsurl = 'https://snf.backend.socialforumindia.com/NRI_Participants';
  getNRI_Participants() {
    return this.http.get(`${this.NRIParticipantsurl}/get`)
  }
  addNRI_Participants(formdata: any) {
    return this.http.post(`${this.NRIParticipantsurl}/post`, formdata);
  }
  updateNRI_Participants(id: number, formData: FormData) {
    return this.http.put(`${this.NRIParticipantsurl}/put/${id}`, formData);
  }
 
  deleteNRI_Participants(id: number): Observable<string> {
    const url = `${this.NRIParticipantsurl}/delete/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

//Well whishes
private Wellwishers = 'https://snf.backend.socialforumindia.com/wellwishers';
getWell_wishers() {
  return this.http.get(`${this.Wellwishers}/get`)
}
addWell_wishers(formdata: any) {
  return this.http.post(`${this.Wellwishers}/post`, formdata);
}
updateWell_wishers(id: number, formData: FormData) {
  return this.http.put(`${this.Wellwishers}/put/${id}`, formData);
}
// deleteState_Participants(id: number) {
//   return this.http.delete(`${this.StateParticipantsurl}/delete/${id}`)
// }
deleteWell_wishers(id: number): Observable<string> {
  const url = `${this.Wellwishers}/delete/${id}`;
  return this.http.delete(url, { responseType: 'text' });
}

  //Who we are --> Team SNF State Participants
  private StateParticipantsurl = 'https://snf.backend.socialforumindia.com/stateparticipant';
  getState_Participants() {
    return this.http.get(`${this.StateParticipantsurl}/get`)
  }
  addState_Participants(formdata: any) {
    return this.http.post(`${this.StateParticipantsurl}/post`, formdata);
  }
  updateState_Participants(id: number, formData: FormData) {
    return this.http.put(`${this.StateParticipantsurl}/put/${id}`, formData);
  }
  // deleteState_Participants(id: number) {
  //   return this.http.delete(`${this.StateParticipantsurl}/delete/${id}`)
  // }
  deleteState_Participants(id: number): Observable<string> {
    const url = `${this.StateParticipantsurl}/delete/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  //Who we do --> OnGoingProject_Clean_Water_Project
  private OnGoingProject_Clean_Water_Projecturl = 'https://snf.backend.socialforumindia.com/OnGoingProject_Clean_Water_Project';
  getOnGoingProject_Clean_Water_Project() {
    return this.http.get(`${this.OnGoingProject_Clean_Water_Projecturl}/get`)
  }
  addOnGoingProject_Clean_Water_Project(formdata: any) {
    return this.http.post(`${this.OnGoingProject_Clean_Water_Projecturl}/post`, formdata);
  }
  updateOnGoingProject_Clean_Water_Project(id: number, formData: FormData) {
    return this.http.put(`${this.OnGoingProject_Clean_Water_Projecturl}/put/${id}`, formData);
  }
  deleteOnGoingProject_Clean_Water_Project(id: number) {
    return this.http.delete(`${this.OnGoingProject_Clean_Water_Projecturl}/delete/${id}`)
  }

  //Who we do --> OnGoingProject_Shahid_Jawan_Fund
  private OnGoingProject_Shahid_Jawan_Fundurl = 'https://snf.backend.socialforumindia.com/OnGoingProject_Shahid_Jawan_Fund';
  getOnGoingProject_Shahid_Jawan_Fund() {
    return this.http.get(`${this.OnGoingProject_Shahid_Jawan_Fundurl}/get`)
  }
  addOnGoingProject_Shahid_Jawan_Fund(formdata: any) {
    return this.http.post(`${this.OnGoingProject_Shahid_Jawan_Fundurl}/post`, formdata);
  }
  updateOnGoingProject_Shahid_Jawan_Fund(id: number, formData: FormData) {
    return this.http.put(`${this.OnGoingProject_Shahid_Jawan_Fundurl}/put/${id}`, formData);
  }
  deleteOnGoingProject_Shahid_Jawan_Fund(id: number) {
    return this.http.delete(`${this.OnGoingProject_Shahid_Jawan_Fundurl}/delete/${id}`)
  }


  //Who we do --> OnGoingProject_Educational_Facilities
  private OnGoingProject_Educational_Facilitiesurl = 'https://snf.backend.socialforumindia.com/OnGoingProject_Educational_Facilities';
  getOnGoingProject_Educational_Facilities() {
    return this.http.get(`${this.OnGoingProject_Educational_Facilitiesurl}/get`)
  }
  addOnGoingProject_Educational_Facilities(formdata: any) {
    return this.http.post(`${this.OnGoingProject_Educational_Facilitiesurl}/post`, formdata);
  }
  updateOnGoingProject_Educational_Facilities(id: number, formData: FormData) {
    return this.http.put(`${this.OnGoingProject_Educational_Facilitiesurl}/put/${id}`, formData);
  }
  deleteOnGoingProject_Educational_Facilities(id: number) {
    return this.http.delete(`${this.OnGoingProject_Educational_Facilitiesurl}/delete/${id}`)
  }


  //Who we do --> OnGoingProject_Health_MedicalProjects
  private OnGoingProject_Health_MedicalProjectsurl = 'https://snf.backend.socialforumindia.com/OnGoingProject_Health_MedicalProjects';
  getOnGoingProject_Health_MedicalProjects() {
    return this.http.get(`${this.OnGoingProject_Health_MedicalProjectsurl}/get`)
  }
  addOnGoingProject_Health_MedicalProjects(formdata: any) {
    return this.http.post(`${this.OnGoingProject_Health_MedicalProjectsurl}/post`, formdata);
  }
  updateOnGoingProject_Health_MedicalProjects(id: number, formData: FormData) {
    return this.http.put(`${this.OnGoingProject_Health_MedicalProjectsurl}/put/${id}`, formData);
  }
  deleteOnGoingProject_Health_MedicalProjects(id: number) {
    return this.http.delete(`${this.OnGoingProject_Health_MedicalProjectsurl}/delete/${id}`)
  }


  //Who we do --> OnGoingProject_Environmental_Conservation
  private OnGoingProject_Environmental_Conservationurl = 'https://snf.backend.socialforumindia.com/OnGoingProject_Environmental_Conservation';
  getOnGoingProject_Environmental_Conservation() {
    return this.http.get(`${this.OnGoingProject_Environmental_Conservationurl}/get`)
  }
  addOnGoingProject_Environmental_Conservation(formdata: any) {
    return this.http.post(`${this.OnGoingProject_Environmental_Conservationurl}/post`, formdata);
  }
  updateOnGoingProject_Environmental_Conservation(id: number, formData: FormData) {
    return this.http.put(`${this.OnGoingProject_Environmental_Conservationurl}/put/${id}`, formData);
  }
  deleteOnGoingProject_Environmental_Conservation(id: number) {
    return this.http.delete(`${this.OnGoingProject_Environmental_Conservationurl}/delete/${id}`)
  }

  //Who we do --> OnGoingProject_Sport_Projects
  private OnGoingProject_Sport_Projectsurl = 'https://snf.backend.socialforumindia.com/OnGoingProject_Sport_Projects';
  getOnGoingProject_Sport_Projects() {
    return this.http.get(`${this.OnGoingProject_Sport_Projectsurl}/get`)
  }
  addOnGoingProject_Sport_Projects(formdata: any) {
    return this.http.post(`${this.OnGoingProject_Sport_Projectsurl}/post`, formdata);
  }
  updateOnGoingProject_Sport_Projects(id: number, formData: FormData) {
    return this.http.put(`${this.OnGoingProject_Sport_Projectsurl}/put/${id}`, formData);
  }
  deleteOnGoingProject_Sport_Projects(id: number) {
    return this.http.delete(`${this.OnGoingProject_Sport_Projectsurl}/delete/${id}`)
  }


  //Who we do --> OnGoingProject_Birthday_Celebrations
  private OnGoingProject_Birthday_Celebrationsurl = 'https://snf.backend.socialforumindia.com/OnGoingProject_Birthday_Celebrations';
  getOnGoingProject_Birthday_Celebrations() {
    return this.http.get(`${this.OnGoingProject_Birthday_Celebrationsurl}/get`)
  }
  addOnGoingProject_Birthday_Celebrations(formdata: any) {
    return this.http.post(`${this.OnGoingProject_Birthday_Celebrationsurl}/post`, formdata);
  }
  updateOnGoingProject_Birthday_Celebrations(id: number, formData: FormData) {
    return this.http.put(`${this.OnGoingProject_Birthday_Celebrationsurl}/put/${id}`, formData);
  }
  deleteOnGoingProject_Birthday_Celebrations(id: number) {
    return this.http.delete(`${this.OnGoingProject_Birthday_Celebrationsurl}/delete/${id}`)
  }

  //Media/Awards -->  article_on_snf
  private article_on_snfurl = 'https://snf.backend.socialforumindia.com/article_on_snf';
  getarticle_on_snf() {
    return this.http.get(`${this.article_on_snfurl}/get`)
  }
  addarticle_on_snf(formdata: any) {
    return this.http.post(`${this.article_on_snfurl}/post`, formdata);
  }
  updatearticle_on_snf(id: number, formData: FormData) {
    return this.http.put(`${this.article_on_snfurl}/put/${id}`, formData);
  }
 
  deletearticle_on_snf(id: number): Observable<string> {
    const url = `${this.article_on_snfurl}/delete/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }
  //  Media/Awards -->  snf_in_news_papers
  private snf_in_news_papersurl = 'https://snf.backend.socialforumindia.com/homemedia';
  getsnf_in_news_papers() {
    return this.http.get(`${this.snf_in_news_papersurl}/get`)
  }
  addsnf_in_news_papers(formdata: any) {
    return this.http.post(`${this.snf_in_news_papersurl}/post`, formdata);
  }
  updatesnf_in_news_papers(id: number, formData: FormData) {
    return this.http.put(`${this.snf_in_news_papersurl}/put/${id}`, formData);
  }
 
  deletesnf_in_news_papers(id: number): Observable<string> {
    const url = `${this.snf_in_news_papersurl}/delete/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }


  //  Media/Awards -->  awards_recognation
  private awards_recognationurl = 'https://snf.backend.socialforumindia.com/awards_recognation';
  getawards_recognation() {
    return this.http.get(`${this.awards_recognationurl}/get`)
  }
  addawards_recognation(formdata: any) {
    return this.http.post(`${this.awards_recognationurl}/post`, formdata);
  }
  updateawards_recognation(id: number, formData: FormData) {
    return this.http.put(`${this.awards_recognationurl}/put/${id}`, formData);
  }
 
  deleteawards_recognation(id: number): Observable<string> {
    const url = `${this.awards_recognationurl}/delete/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }
//  Upcoming project 
  // Home Home_2_Cards image API 
  private upcoming_url = 'https://snf.backend.socialforumindia.com/upcomingeventsRoute';

  addupcomingproject(formdata: any) {
    return this.http.post(`${this.upcoming_url}/post`, formdata);
  }

  getupcomingproject() {
    // return this.http.get<UpcomingProject[]>(`${this.apiUrl}/upcomingprojects`);
    return this.http.get<any[]>(`${this.upcoming_url}/get`)
  }

  updateupcomingproject(id: number, formData: any) {
    return this.http.put(`${this.upcoming_url}/put/${id}`, formData);
  }

  // deleteupcomingproject(id: number) {
  //   return this.http.delete(`${this.upcoming_url}/delete/${id}`)

  // }
  deleteupcomingproject(id: number): Observable<string> {
    const url = `${this.upcoming_url}/delete/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  //Add Project catgory
  // Home Home_2_Cards image API 
  private projectcategory_url = 'https://snf.backend.socialforumindia.com/upcomingeventstitleRoute';

  addProject(projectData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.projectcategory_url}/post`, JSON.stringify(projectData), { headers });
  }

  updateProject(id: number, projectData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.projectcategory_url}/put/${id}`, JSON.stringify(projectData), { headers });
  }

  deleteProject(id: number): Observable<any> {
    const url = `${this.projectcategory_url}/delete/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  getProject(): Observable<any> {
    return this.http.get(`${this.projectcategory_url}/get`);
  }
  
 

  addupcomingimage(formdata: any) {
    return this.http.post(`${this.upcoming_url}/addImagesByCategory`, formdata);
  }

  getupcomingimage() {
    return this.http.get(`${this.upcoming_url}/getAllImagesData`)
  }

  updateupcomingimage(id: number, formData: any) {
    return this.http.put(`${this.upcoming_url}/putImages/${id}`, formData);
  }

  deleteupcomingimage(id: number) {
    return this.http.delete(`${this.upcoming_url}/deleteImages/${id}`)

  }
  // deleteupcomingimage(id: number): Observable<string> {
  //   const url = `${this.upcoming_url}/delete/${id}`;
  //   return this.http.delete(url, { responseType: 'text' });
  // }

}
