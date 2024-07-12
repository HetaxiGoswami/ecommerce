import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-dash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-dash.component.html',
  styleUrl: './seller-dash.component.scss'
})
export class SellerDashComponent implements OnInit{

  order_dashboard_data:any;
  total_order:any;
  last_order_date:any;
  product_dashboard_data:any;
  total_product:number =0;
  publish_product:number =0;
  inactive_product:number =0;
  draft_product:number =0;

  constructor(private customerService:CustomerService, private router:Router){}

  ngOnInit(): void {
    this.sellerOrderDashboardData();
    this.sellerProductDashboardData();
  }
  sellerProductDashboard(){
    this.router.navigateByUrl("/seller/product")
  }
  sellerOrderDashboard(){
    alert("this option for only WIP candidates")
  }

  // order ni jetli pn data aavse a length pramane convert karse chello order jose 
  sellerOrderDashboardData(){
    this.customerService.orderDashboardData().subscribe(data=>{
      this.order_dashboard_data = data;
      console.log("Order Dashboard data",this.order_dashboard_data);
      this.total_order = Number(this.order_dashboard_data.length);
      this.last_order_date = this.order_dashboard_data[this.total_order -1].dateTime;
    }, error=>{
      console.log("My error data", error);
    })
  }

// aiya for loop che km k je status che a product dashboard ma store kari de che 

  sellerProductDashboardData(){
    this.customerService.productDashboardData().subscribe(data =>{
      this.product_dashboard_data = data;
      for(status in this.product_dashboard_data){
        // console.log(this.product_dashboard_data[status].status);
        if(this.product_dashboard_data[status].status =='publish'){
          // if the status publish hase toh te increment thatu rese ketla publish, inactive su che te batavse
          ++this.publish_product;
        }else if(this.product_dashboard_data[status].status =='inactive'){
          ++this.inactive_product;
        }else if(this.product_dashboard_data[status].status =='draft'){
          ++this.draft_product;
        }
        ++this.total_product;
      }
    },error =>{
      console.log("My error",error)
    })
  }
}
