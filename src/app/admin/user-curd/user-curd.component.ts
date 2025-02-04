import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../../core/model/object.model';
declare var $: any;

@Component({
  selector: 'app-user-curd',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-curd.component.html',
  styleUrl: './user-curd.component.scss',
})
export class UserCurdComponent {


  // Do: badha users store thase aa variable ma
  all_user_data: any;

  // Do: particular user ne edit karva mate 
  single_user_data: any;

  // Do: aa add and edit karva mate form laiye te
  addEditUserForm!: FormGroup;

  // Do: aa variable ma user naam nu model banayu che jema badhi fields che 
  user_dto!: User;

  // Do: aa variable ma addEditUserForm nu badhu handle karavse
  user_reg_data: any;

  // Do: edit karva mate particular id
  edit_user_id: any;

  // Do: file upload karva mate
  upload_file_name!: string;

  // Do: three boolean UI ma handle karse jyare ane true thavanu hase tyare thase nakar toh aa false maj rese
  addEditUser: boolean = false; 
  add_user: boolean = false;
  edit_user: boolean = false;

  // Do: text mate che k a add user che k edit user 
  popup_header!: string;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {

    // Do: badha user get thase 
    this.getAllUser();

  // Do: form validations withreactive form
    this.addEditUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      addLine1: ['', Validators.required],
      addLine2: [],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      agreetc: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  // user data list
  getAllUser() {
    this.adminService.allUser().subscribe(
      (data) => {
        this.all_user_data = data;
      },
      (error) => {
        console.log('My error', error);
      }
    );
  }

 // jem ke touched control karse
  get rf() {
    return this.addEditUserForm.controls;
  }


  // aa function jyare new user hase tyare use thase
  addUserPopup() {
    this.edit_user = false;
    this.add_user = true;
    this.popup_header = 'Add New User';
    this.addEditUserForm.reset();
  }

  // add user api ni field pramane add thase 
  addUser() {
    this.addEditUser = true;
    if (this.addEditUserForm.invalid) {
      alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value));
      return;
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_dto = {
      aboutYou: this.user_reg_data.aboutYou,
      age: this.user_reg_data.age,
      agreetc: this.user_reg_data.agreetc,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      gender: this.user_reg_data.gender,
      address: {
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
      },
      language: this.user_reg_data.language,
      mobNumber: this.user_reg_data.mobNumber,
      name: this.user_reg_data.name,
      password: this.user_reg_data.password,
      uploadPhoto: this.user_reg_data.uploadPhoto,
      role: this.user_reg_data.role,
    };
    this.adminService.addUser(this.user_dto).subscribe(
      (data) => {
        this.addEditUserForm.reset();
        this.getAllUser();
        $('#addEditUserModal').modal('toggle');
      },
      (error) => {
        console.log('my wrong ', error);
      }
    );
  }
  editUserPopup(user_id: any) {
    this.edit_user_id = user_id;
    this.edit_user = true;
    this.add_user = false;
    this.popup_header = 'Edit User';
    this.adminService.singleuUser(user_id).subscribe(
      (data) => {
        this.single_user_data = data;
        this.upload_file_name = this.single_user_data.uploadPhoto;
        this.addEditUserForm.setValue({
          name: this.single_user_data.name,
          mobNumber: this.single_user_data.mobNumber,
          age: this.single_user_data.age,
          dob: this.single_user_data.dob,
          email: this.single_user_data.email,
          password: this.single_user_data.password,
          language: this.single_user_data.language,
          gender: this.single_user_data.gender,
          addLine1: this.single_user_data.address.addLine1,
          addLine2: this.single_user_data.address.addLine2,
          city: this.single_user_data.address.city,
          state: this.single_user_data.address.state,
          zipCode: this.single_user_data.address.zipCode,
          aboutYou: this.single_user_data.aboutYou,
          uploadPhoto: '',
          agreetc: this.single_user_data.agreetc,
          role: this.single_user_data.role,
        });
      },
      (error) => {
        console.log('My error', error);
      }
    );
  }
  updateUser() {
    if (this.addEditUserForm.invalid) {
      alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value));
      return;
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_dto = {
      aboutYou: this.user_reg_data.aboutYou,
      age: this.user_reg_data.age,
      agreetc: this.user_reg_data.agreetc,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      gender: this.user_reg_data.gender,
      address: {
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
      },
      language: this.user_reg_data.language,
      mobNumber: this.user_reg_data.mobNumber,
      name: this.user_reg_data.name,
      password: this.user_reg_data.password,
      uploadPhoto:
        this.user_reg_data.uploadPhoto == ''
          ? this.upload_file_name
          : this.user_reg_data.uploadPhoto,
      role: this.user_reg_data.role,
    };
    // edit user khulse popup sathe 
    this.adminService.editUser(this.edit_user_id, this.user_dto).subscribe(
      (data) => {
        this.addEditUserForm.reset();
        this.getAllUser();
        $('#addEditUserModal').modal('toggle');
      },
      (error) => {
        console.log('my wrong ', error);
      }
    );
  }

  // user delete 
  deleteUser(user_id: any) {
    this.adminService.deleteUser(user_id).subscribe(
      (data) => {
        this.getAllUser();
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
