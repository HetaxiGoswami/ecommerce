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

  //all product dekhai che pn hu je add karu chu te nai dekhatu 
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

  //je show checkout aiya true thai jase ane service mathi id laine next karse 
  buyProduct(id: number) {
    this.show_Checkout = true;
    this.customerService.quickBuyProduct(id);
    this.router.navigateByUrl('/checkout');
  }

  addToCart() {
    alert('This is showcase');
  }
}



