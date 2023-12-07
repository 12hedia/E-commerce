import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../model/product.model';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { AppDataState, DataStateEnum } from '../../state/product.state';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productsService: ProductsService, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.onGetSelectedProducts();
  }

  onGetSelectedProducts() {
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map(data => ({
        dataState: DataStateEnum.LOADED,
        data: data
      })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onSelect(p: Product) {
    this.productsService.select(p).subscribe(data => {
      p.selected = data.selected;

      // Vérifie si le produit a été désélectionné
      if (!p.selected) {
        // Actualise la page
        this.location.reload();
      }
    });
  }
}
