import { Component, OnInit } from '@angular/core';
import { Database, set, ref, update, onValue, remove } from '@angular/fire/database';
import { StudentserviceService } from './studentservice.service';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
// import { FilterPipe } from './filter.pipe';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'student';
  displayedColumns: string[] = ['name', 'mark', 'age','action'];
  id = 0;
  filterval:string = "";
  len = 0;
  topper :any =[];
  users:any =[];
  activetab:string ='users';
  winner:any =[];
  
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public database: Database, public api: StudentserviceService) { }

flag:boolean = true
  ngOnInit(): void {
    this.getAllproduct('users.json')
  }
  addwinner(element: any) {
   if(confirm("Are you Want Him to declare as winner ")){
    this.api.getproduct('winner.json').subscribe({
      next: (res) => {
        this.flag = true
        console.log(element.username)
        if(res){
        this.len = res.length;
        for(let i=0;i<res.length;i++){
          if(res[i]['username'] == element.username){
            console.log(res[i]['username'])
            console.log(element)
            console.log("inside loop")
            this.flag = false;
            alert("already present")
            // this.registerUser(element, this.len)
          }
          console.log(this.flag)
        }
       if(this.flag){
        console.log("this is false")
        this.registerUser(element, this.len)
       }
      }
      else{
        this.registerUser(element, 0)
      }
      },
      error: () => {
        alert('Error Happen')
      }
    })
  }

  }
  selecttab(value:string){
    if(value === 'users'){
      this.getAllproduct('users.json');
      this.activetab = 'users'
    }
    else if(value === 'winner'){
      this.getAllproduct('winner.json');
      this.activetab = 'winner'
    }
    else if(value === 'topper'){
      this.getAllproduct('users.json');
      this.activetab = 'topper'
    }
  }
  
  getAllproduct(value:string) {
    // console.log("thisx os ")
    this.api.getproduct(value).subscribe({
      next: (res) => {
     
        if(this.activetab === 'users'){
          this.users = []
          for(let i=0;i<res.length;i++){

            if(res[i]['age'] <21){
            
              this.users.push(res[i])
            }
           
          }
          
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.sort = this.sort;
          this.displayedColumns = ['name', 'mark', 'age','action']
        }
        else if(this.activetab === 'topper'){
          // console.log("skdk")
          this.topper =[];
          for(let i=0;i<res.length;i++){
            if(res[i]['marks'] >90){
             
              this.topper.push(res[i])
            }
           
          }
          console.log(this.topper)
          this.dataSource = this.topper
          this.displayedColumns = ['name', 'mark', 'age']
        }else if(this.activetab === 'winner'){
          
          this.dataSource = res;
          this.displayedColumns = ['name', 'mark', 'age']
        }

        
      },
      error: () => {
        alert('Error Happen')
      }
    })
  }
  registerUser(value: any, mylen: any) {
    //create data
    set(ref(this.database, 'winner/' + mylen), {
      // id:this.id,
      username: value.username,
      marks: value.marks,
      age: value.age,
      //  this.id 
    });
    // len = len +1

    alert('Winner added');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
}
