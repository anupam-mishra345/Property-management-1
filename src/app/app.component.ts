import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Intellitick-Property-Management';

  properties = [
    {
      id:1,
      name: 'Lake View Apartments', 
      description: 'Lake view property', 
      size: 4800
    },
    {
      id:2,
      name: 'Garden View Apartments', 
      description: 'Garden view property', 
      size: 5200
    },
    {
      id:3,
      name: 'Park View Apartments', 
      description: 'Park view property', 
      size: 4400
    },
    {
      id:4,
      name: 'Golf View Apartments', 
      description: 'Golf view property', 
      size: 7600
    },
    {
      id:5,
      name: 'Stadium View Apartments', 
      description: 'Stadium view property', 
      size: 1200
    }
  ];
  
  form!: FormGroup;

  @ViewChild('modal', { static: false }) modal!: ElementRef;

  constructor(private renderer: Renderer2){
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      size: new FormControl("", [Validators.required])
    });
  }
  
  addProperty(formValue: any){
    console.log("formvalues: ", this.form);
    if(this.form.valid){
      this.properties.push({
        id: this.properties[this.properties.length-1].id+1,
        name: formValue.name,
        description: formValue.description,
        size: formValue.size
      })
      this.closeModal();
    }
  }

  openModal(){
    this.renderer.addClass(this.modal.nativeElement, 'show')
  }

  closeModal(){
    this.form.reset();
    // reset the errors of all the controls
    for (let name in this.form.controls) {
      this.form.controls[name].setErrors(null);
    }
    this.renderer.removeClass(this.modal.nativeElement, 'show');
  }

  deleteProperty(id:any,i:any){
    let tempArr:any = [];
    this.properties.forEach(data =>{
      if(id != data.id){
        tempArr.push(data);
      }
    });
    this.properties = tempArr;
  }
}
