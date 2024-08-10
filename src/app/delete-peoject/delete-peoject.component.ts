import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-peoject',
  templateUrl: './delete-peoject.component.html',
  styleUrl: './delete-peoject.component.css'
})
export class DeletePeojectComponent {
  baseUrl : string ="http://localhost:8080/api/v1";
  
  constructor(
    private http:HttpClient,
    public dialogRef: MatDialogRef<DeletePeojectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
  }

  onClose(): void {
    this.dialogRef.close();
  }


openDeleteModal() {
  let modal = document.getElementById('deleteConfirmModal');
  if (modal) {
    modal.classList.add('show');
    modal.style.display = 'block';
  }
}

  onDeleteClick(id:number){
    this.http.delete(this.baseUrl+"/delete/project?id="+id).subscribe((response:any)=>{
      if(response.data){
        this.onClose();
      }else{
        alert(response.msg)
      }
    },(error)=>{
       console.log("Error while deleting project",error);
    })
  }
}
