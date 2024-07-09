import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buyer-dash',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './buyer-dash.component.html',
  styleUrl: './buyer-dash.component.scss',
})
export class BuyerDashComponent {
  all_products: any;
  show_Checkout: boolean = false;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
  }
  getAllProduct() {
    this.customerService.allProduct().subscribe(
      (data) => {
        this.all_products = data;
        console.log(this.all_products);
      },
      (error) => {
        console.log('My error', error);
      }
    );
  }

  buyProduct(id: number) {
    this.show_Checkout = true;
    this.customerService.quickBuyProduct(id);
    this.router.navigateByUrl('/checkout');
  }
  addToCart() {
    alert('This is showcase');
  }
}



