import { Component } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as mocks from 'src/assets/data/mock.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng13-form-array';
  myCourse: FormGroup;

  itemsMock: any[]
  formItems!: FormGroup

  constructor(private fb: FormBuilder) {
    const { items } = mocks
    this.itemsMock = items || []
    this.myCourse = this.fb.group({
      myCourseLists: this.fb.array([this.addNewCourse(), this.addNewCourse(), this.addNewCourse()])
    })
    this.buildFormItem()

    if (this.itemsMock.length) {
      this.itemsMock.forEach((v, i) => {
        this.addFormGroup()
        if (v?.studyYears.length) {
          v?.studyYears.forEach((v2: any, j: number) => {
            this.studyYearsFn(i);
            if (v2?.studySemesters.length) {
              v2?.studySemesters.forEach((v3: any, k: number) => {
                this.studySemestersFn(i, j);
              });
            }
          });
        }
      });
    }

    this.formItems.get('items')?.patchValue(this.itemsMock)

    console.log(this.itemsMock)
  }

  buildFormItem() {
    this.formItems = this.fb.group({
      items: this.fb.array([])
    })
  }

  get items(): FormArray {
    return this.formItems.get('items') as FormArray
  }

  studyYears(index: number): FormArray {
    const c1 = this.items?.at(index)
    return c1?.get('studyYears') as FormArray
  }

  studySemesters(i: number, j: number): FormArray {
    const c2 = this.studyYears(i)?.at(j)
    return c2?.get('studySemesters') as FormArray
  }


  addSingleForm(): FormGroup {
    return this.fb.group({
      eduSubLevel: [],
      status: [],
      activeFlag: [],
      approveFlag: [],
      academicYear: [],
      regularYear: [],
      numberSemester: [],
      numberStudent: [],
      enrolledStudent: [],
      totalEducationFee: [],
      tuitionFeeType: [],
      facultyCode: [],
      facultyName: [],
      subjectFieldHigherEduCode: [],
      subjectFieldHigherEduName: [],
      curriculumCode: [],
      curriculumName: [],
      courseTypeCode: [],
      discription: [],
      studyYears: this.fb.array([]),
    })
  }

  addStudyYears(): FormGroup {
    return this.fb.group({
      studySemesters: this.fb.array([]),
      classYearCode: [],
      classYearName: []
    })
  }

  addStudySemesters() {
    return this.fb.group({
      semester: [],
      relatedFee: [],
      tuitionFee: []
    })
  }

  addFormGroup() {
    const newForm = this.formItems?.get('items');
    (newForm as FormArray).push(this.addSingleForm())
  }

  deleteForm(index: number) {
    const form = this.formItems.get('items');
    (form as FormArray).removeAt(index)
  }
  delStudyYearsFn(i: number, j: number) {
    // const form = this.formItems.get('items');
    // (form as FormArray).removeAt(index)
    const f1 = this.items?.at(i)
    const f2 = f1?.get('studyYears') as FormArray
    f2?.removeAt(j)
  }

  studyYearsFn(index: number) {
    const f1 = this.items?.at(index)
    const f2 = f1?.get('studyYears') as FormArray
    f2?.push(this.addStudyYears())

  }
  studySemestersFn(i: number, j: number) {
    const f1 = this.items?.at(i)
    const f2 = f1?.get('studyYears') as FormArray
    const f3 = f2?.at(j)?.get('studySemesters') as FormArray
    f3?.push(this.addStudySemesters())

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
