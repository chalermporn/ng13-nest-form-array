import { Component } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng13-form-array';
  myCourse: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myCourse = this.fb.group({
      myCourseLists: this.fb.array([this.addNewCourse(), this.addNewCourse(), this.addNewCourse()])
    })

    console.log(this.myCourse);
  }

  get myCourseLists(): FormArray {
    return this.myCourse.get('myCourseLists') as FormArray;
  }
  courseLists(index: number): FormArray {
    const c1 = this.myCourseLists.at(index)
    return c1?.get('courseLists') as FormArray;
  }
  studies(index: number): FormArray {
    const c2 = this.courseLists(index).at(index)
    return c2?.get('studies') as FormArray;
  }

  addNewCourse(): FormGroup {
    return this.fb.group({
      name: ['C1'],
      courseLists: this.fb.array([this.addNewCourseList()])
    })

  }

  addNewCourseList(): FormGroup {
    return this.fb.group({
      name: ['C2'],
      point: [1],
      studies: this.fb.array([this.addNewStudyList()])
    })
  }

  addNewStudyList(): FormGroup {
    return this.fb.group({
      name: ['C3'],
      class: 'Y1'
    })
  }
}
