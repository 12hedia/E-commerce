import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../services/products.service';
@Component({
selector: 'app-product-add',
templateUrl: './product-add.component.html',
styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
productFormGroup?:FormGroup;
submitted:boolean=false;
constructor(private fb:FormBuilder, private productsService:ProductsService) 
{ }
ngOnInit(): void {
this.productFormGroup=this.fb.group({
name:["",Validators.required],
price:[0,Validators.required],
quantity:[0,Validators.required],
selected:[true,Validators.required],
available:[true,Validators.required],
image: ["",Validators.required] // Champ pour l'image
});
}
onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.productFormGroup?.get('image')?.setValue(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  onSaveProduct() {
    this.submitted = true;

    if (this.productFormGroup?.valid) {
      this.productsService.save(this.productFormGroup.value).subscribe(() => {
        alert("Success Product added");
        this.productFormGroup?.reset();
        this.submitted = false;
      });
    }
}}
