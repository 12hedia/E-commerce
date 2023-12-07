import { Component } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service'
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {
  products: Product[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    // Chargez les produits depuis le service lors de l'initialisation du composant
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  buyProduct(product: Product): void {
    // Logique d'achat ici
    // Pour cet exemple, nous allons simplement appeler une méthode de service pour mettre à jour la sélection
    this.productService.select(product).subscribe(updatedProduct => {
      // Mettez à jour le produit dans la liste locale si nécessaire
      const index = this.products.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        this.products[index] = updatedProduct;
      }
      console.log(`Achat du produit : ${product.name}`);
    });
  }


  onSelect(p: Product) {
    
    this.productService.select(p)
    .subscribe(data=>{
    p.selected=data.selected;
    })
    }


}
