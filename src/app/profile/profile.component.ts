import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteserviceService } from '../noteservice.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Helper } from '../helper';
declare var $:any

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  AllNotes:any;
  token:any;
  decoded:any;
  isLoad = false;
  //image_url= "https://srv765.hstgr.io:7443/e5df7439d6de81f8/files/public_html/sag/public/uploads/glass/glass-64299f34cfb86.png";
  image_url= "http://sag.almostafabure.com/public/uploads/glass/book-643f342ba84b0.png";
    //   http://sag.almostafabure.com/api/

  constructor(private _Router: Router, private _NotesService: NoteserviceService ,private sanitizer: DomSanitizer) {
    try {
      this.token = localStorage.getItem("TOKEN");
    } catch (error) {
      localStorage.clear();
      this._Router.navigate(["/signin"]);
    }
    if (!localStorage.getItem("TOKEN")) {
      this._Router.navigate(["/signin"]);
    }
    this.getAllNotes();
  }

  AddNote = new FormGroup({
    title: new FormControl("", Validators.required),
    desc: new FormControl("", Validators.required),
  });

  getAllNotes() {
    this._NotesService.getAllglassess().subscribe((res:any) => {
      console.log(res['data']);
      if (res.message == "success") {
        this.isLoad = true;
        this.AllNotes = res.data;
      } else {
        localStorage.clear();
        this._Router.navigate(["/signin"]);
      }
    });
  }
  setFile(event: { target: { files: any[]; }; }, key: string) {
    this.AllNotes[key] = event.target.files[0];
  }
  viewPersonalImage(event: { target: { files: any[]; }; }) {
    this.setFile(event, 'image');
    var reader = new FileReader();
    reader.readAsDataURL(this.AllNotes.image);
    reader.onload = (_event) => {
      this.AllNotes.image_url = reader.result;
    }
  }
  addData() {
    let data = {
      title: this.AddNote.value.title,
      desc: this.AddNote.value.desc,
      token: this.token,
      citizenID: "this.decoded._id",
    };

    this._NotesService.addNote(data).subscribe((res:any) => {
      if (res.message == "success") {
        $("#AddNote").modal("hide");
        this.getAllNotes();
        this.AddNote.reset();
      }
    });
    // console.log(this.AddNote.value);
  }
  // ============================ delete note =================================
  NOTE_ID:any;
  getID(id:any) {
    this.NOTE_ID = id;
    console.log(id);
  }
  deleteNote() {
    // let data = {
    //   token: this.token,
    //   NoteID: this.NOTE_ID,
    // };
    // this._NotesService.deleteNote(data).subscribe((res:any) => {
    //   console.log(res);
    //   if (res.message == "deleted") {
    //     $("#DeleteNote").modal("hide");
    //     this.getAllNotes();
    //   }
    // });
  }
  // ============================= edit=========================
  setValue()
  {
    // for (let index = 0; index < this.AllNotes.length; index++) {
    // if(this.AllNotes[index]._id==this.NOTE_ID)
    // {
    //   // console.log(this.AllNotes[index]);
    //   this.AddNote.controls.title.setValue(this.AllNotes[index].title)
    //   this.AddNote.controls.desc.setValue(this.AllNotes[index].desc)

    // }

    // }
  }
  editNote()
  {
    // let data={
    //   title:this.AddNote.value.title,
    //   desc:this.AddNote.value.desc,
    //   NoteID:this.NOTE_ID,
    //   token:this.token
    // }

    // this._NotesService.updateNote(data).subscribe((res: { message: string; }) =>{
    //   console.log(res);
    //   if(res.message=='updated')
    //  {
    //   $("#EditNote").modal("hide");
    //   this.getAllNotes();


    //  }

    // })
  }
  ngOnInit() {}
}
