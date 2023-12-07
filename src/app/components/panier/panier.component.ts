import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../model/product.model';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {AppDataState, DataStateEnum} from '../../state/product.state';
import {Router} from '@angular/router';
@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  products$:Observable<AppDataState<Product[]>> |null=null;
  readonly DataStateEnum=DataStateEnum;
  constructor(private productsService:ProductsService, private router:Router) 
  { }
  ngOnInit(): void {
  }

  onGetSelectedProducts() {
    this.products$= this.productsService.getSelectedProducts().pipe(
    map(data=>{
    console.log(data);
    return ({dataState:DataStateEnum.LOADED,data:data})
    }),
    startWith({dataState:DataStateEnum.LOADING}),
    catchError(err=>of({dataState:DataStateEnum.ERROR, 
    errorMessage:err.message}))
    );
    }
    
    onDelete(p: Product) {
      let v=confirm("Etes vous sûre?");
      if(v==true)
      this.productsService.deleteProduct(p)
      .subscribe(data=>{
      this.productsService.getAllProducts();
      })
      }
      onSelect(p: Product) {
        this.productsService.select(p)
        .subscribe(data=>{
        p.selected=data.selected;
        })
        }
}
