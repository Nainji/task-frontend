import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  taskForm: FormGroup;
  tasks: any = [];
  isTaskFormVisible = false;

  constructor(private fb: FormBuilder,private apiService:ApiServiceService) {
    this.taskForm = this.fb.group({
      description: ['', Validators.required],
    });
    this.getTask();
  }

  openTaskForm() {
    this.isTaskFormVisible = true;
  }

  getTask(){
    this.apiService.get('tasks').subscribe((res:any)=>{
      if(res.status){
          this.tasks=res.data
      }
    })
  }

  closeTaskForm() {
    this.isTaskFormVisible = false;
  }

  addTask() {
    if (this.taskForm.valid) {
      const newTask = {
        description: this.taskForm.value.description,
        created_at: new Date(),
      };
      this.apiService.post('tasks',newTask).subscribe((res:any)=>{
        if(res.status){
          
          this.tasks.push(res.data);
          this.taskForm.reset();
          this.closeTaskForm();
        }else{
          alert(res.error)
          
        }
      })
    }
  }

  deleteTask(index: number) {
    this.apiService.delete("tasks",this.tasks[index].id).subscribe((res:any)=>{
      if(res.status){
        this.tasks.splice(index, 1);
      }else{
        alert(res.message)
      }
    });
  }
}
