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

    console.log(this.itemsMock)
  }

  buildFormItem() {
    this.formItems = this.fb.group({
      items: this.fb.array([this.addSingleForm()])
    })
  }

  get items(): FormArray {
    return this.formItems.get('items') as FormArray
  }

  studyYears(index: number): FormArray {
    const c1 = this.items?.at(index)
    return c1?.get('studyYears') as FormArray
  }
  studySemesters(index: number): FormArray {
    const c2 = this.studyYears(index)?.at(index)
    return c2?.get('studySemesters') as FormArray
  }


  addSingleForm(): FormGroup {
    return this.fb.group({
      eduSubLevel: ["41",],
      status: ["Y",],
      activeFlag: ["Y",],
      approveFlag: ["N",],
      academicYear: ["2565",],
      regularYear: [4,],
      numberSemester: [3,],
      numberStudent: [1000],
      enrolledStudent: [1000,],
      totalEducationFee: [36,],
      tuitionFeeType: ["01",],
      facultyCode: ["00096",],
      facultyName: ["คณะศิลปศาสตร์",],
      subjectFieldHigherEduCode: ["00000",],
      subjectFieldHigherEduName: ["ไม่ระบุ (ในกรณีที่นักศึกษาเข้าใหม่ยังไม่ได้เลือกสาขาวิชา)",],
      curriculumCode: ["00000000000000-001",],
      curriculumName: ["ไม่ระบุ (ในกรณีที่นักศึกษาเข้าใหม่ยังไม่ได้เลือกสาขาวิชา)",],
      courseTypeCode: ["01",],
      discription: [""],
      studyYears: this.fb.array([this.addStudyYears(), this.addStudyYears()])
    })
  }

  addStudyYears(): FormGroup {
    return this.fb.group({
      studySemesters: this.fb.array([this.addStudySemesters(), this.addStudySemesters()]),
      classYearCode: ["001"],
      classYearName: ["Y3"]
    })
  }

  addStudySemesters() {
    return this.fb.group({
      semester: [1],
      relatedFee: [1],
      tuitionFee: [1]
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

  studyYearsFn(index: number) {
    const f1 = this.items?.at(index)
    const f2 = f1?.get('studyYears') as FormArray
    f2?.push(this.addStudyYears())

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
