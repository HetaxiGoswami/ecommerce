import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../core/model/object.model';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {


  // Do: badha products get thase api throw je data aavse te aa variable ma store karaya che
  all_product_data:any

  // Do: aama je formgroup che te reactive form mate use thayu che ane add/edit karava use thae 
  addEditProductDForm!:FormGroup;

  // badha ma modal ek j che add, edit ma pn etle aama true and false varu kariyu che
  // Do: edit vakhat je edit na button par je function hase ama aa variable true thase , true thase etle modal open thase edit mate
  addEditProduct:boolean = false;

  // Do: je popup ma katu header aavse add nu k edit nu te display karavse  
  popup_header!:string;

  // Do: add and edit roduct mode dekhase k if aa variable hase toh kayo mode hase 
  add_prouct!:boolean;
  edit_prouct!:boolean;

  // Do: je product form data che te store karavse
  prouct_data:any;

  // Do: edit karva mate particular id thi karavse  
  single_product_data:any;

  // Do: product model ma product fields ni details che te aa variable ma store karai didhu che
  product_dto!:Product

  // Do: product edit karva mate ni Id 
  edit_product_id:any;

  constructor(private fb:FormBuilder, private router:Router, private productService:ProductService){

  }

  ngOnInit(): void {
    this.addEditProductDForm = this.fb.group({
      name:['',Validators.required],
      uploadPhoto:['',Validators.required],
      productDesc:['',Validators.required],
      mrp:['',Validators.required],
      dp:['',Validators.required],
      status:['',Validators.required],
    })
    this.getAllProduct()
  }
  get rf(){
    return this.addEditProductDForm.controls;
  }


  getAllProduct(){
    this.productService.allProduct().subscribe(data =>{
      this.all_product_data = data;
      console.log("My All product", this.all_product_data)
    }, error =>{
      console.log("Somthing went wrong ", error)
    })
  }

// product add karva mate nu che 
  addProductPopup(){
    this.add_prouct = true;
    this.edit_prouct = false;
    this.popup_header = "Add new Product";
    this.addEditProductDForm.reset();
  }

  // add new user jema form invalid hase toh return thase 
  addNewProduct(){
    this.addEditProduct = true;
    if(this.addEditProductDForm.invalid){
      return;
    }
    this.prouct_data = this.addEditProductDForm.value;
    this.product_dto = {
      id:0,
      name:this.prouct_data.name,
      uploadPhoto:this.prouct_data.uploadPhoto,
      productDesc:this.prouct_data.productDesc,
      mrp:this.prouct_data.mrp,
      dp:this.prouct_data.dp,
      status:this.prouct_data.status,
    }
    this.productService.addNewProduct(this.product_dto).subscribe(data=>{
      console.log(data);
      this.getAllProduct();
      this.router.navigate(['seller/product'])
    },error=>{
      console.log("my error", error)
    })
  }

  // edit karva mate je form lidhu hoi anu 
  editProductPopup(id:any){
    this.add_prouct = false;
    this.edit_prouct = true;
    // jyare edit nu khulse tyare aa edit product lakhelu aavse
    this.popup_header = "Edit Product";
    this.addEditProductDForm.reset();
    this.productService.singleProduct(id).subscribe(data=>{
      this.single_product_data = data;
      console.log("Single Data", this.single_product_data);
      this.edit_product_id = data.id;
      // aa form ma value set karavse 
      this.addEditProductDForm.setValue({
        name:this.single_product_data.name,
        uploadPhoto:this.single_product_data.uploadPhoto,
        productDesc:this.single_product_data.productDesc,
        mrp:this.single_product_data.mrp,
        dp:this.single_product_data.dp,
        status:this.single_product_data.status
      })
    })
  }

//upadte karse addesit varu true karse product_dto a product che jema aa badhu tema add thatu rese form ni value 
  updateProduct(){
    this.addEditProduct = true;
    if(this.addEditProductDForm.invalid){
      return;
    }
    this.prouct_data = this.addEditProductDForm.value;
    this.product_dto = {
      id:0,
      name:this.prouct_data.name,
      uploadPhoto:this.prouct_data.uploadPhoto,
      productDesc:this.prouct_data.productDesc,
      mrp:this.prouct_data.mrp,
      dp:this.prouct_data.dp,
      status:this.prouct_data.status,
    }
    this.productService.updateProduct(this.edit_product_id,this.product_dto).subscribe(data=>{
      this.getAllProduct();

    },error=>{
      console.log("my error", error)
    })
  }
  deleteProduct(id:any){
    let conf = confirm("Do you want to delete this product id:" + id);
    if(conf){
      this.productService.deleteProduct(id).subscribe(data=>{
        console.log("Deleted successfull", data);
        this.getAllProduct();
      }, err=>{
        console.log(err)
      })
    }else{
      alert("cancel !")
    }
  }
}