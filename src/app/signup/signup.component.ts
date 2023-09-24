import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { AuthService } from '../auth.service';
import { GeneralService } from '../general.service';

 declare var $:any
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isStyleInvalid={'background-color':'#17a2b8','border-color':'#17a2b8'}
  isStyleValid={'background-color':'gray','border-color':'gray'}
  isClicked=false
  ResponseMessage=""
  isUniuqeEmailMessage=""
  isUniuqeEmail=false
  isSuccess=false
  data:any
  data2:any
  constructor(private _AuthService:AuthService, private _GeneralService:GeneralService) { }
  signUp=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    phone:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    city:new FormControl('',Validators.required),
    relationship:new FormControl('',Validators.required),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)])
   })

   FormData()
   {
     this.isClicked=true
    if(this.signUp.valid)
    {
        this._AuthService.signUp(this.signUp.value).subscribe(response=>{

        if(response.status == 200)
        {
          this.isClicked=false
          this.isSuccess=true
          this.isUniuqeEmail=false
          this.ResponseMessage=response.message
          this.signUp.reset()
        }else
        {
          this.isUniuqeEmailMessage=response.ERROR
          this.isUniuqeEmail=true
          this.isSuccess=false
          this.isClicked=false
        }
        console.log(response)
      })
    }
   }
   getAllCity()
   {
        this._GeneralService.getAllCity().subscribe(res => {
         console.log(res.data);
           this.data =res.data;
        })
   }
   getAllrelative()
   {
        this._GeneralService.getAllrelative().subscribe(res => {
         console.log(res);
           this.data2 =res.data;
        })
   }
  ngOnInit(): void
   {
    this.getAllCity();
    this.getAllrelative();
     $('#signup').particleground();
   }
}
