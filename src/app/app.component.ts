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
  dataMock: any[]
  formItems!: FormGroup

  constructor(private fb: FormBuilder) {
    const { items } = mocks
    this.dataMock = [{
      "numberSemester": 2,
      "regularYear": 4
    }]
    this.itemsMock = items || []
    this.myCourse = this.fb.group({
      myCourseLists: this.fb.array([this.addNewCourse(), this.addNewCourse(), this.addNewCourse()])
    })
    this.buildFormItem()
    this.init()
    // this.initForm()
    // this.patchData();
  }
  initForm() {
    if (this.itemsMock.length) {
      this.itemsMock.forEach((v, i) => {
        this.addFormGroup()
        if (v?.studyYears.length) {
          v?.studyYears.forEach((v2: any, j: number) => {
            this.studyYearsFn(i);
            if (v2?.studySemesters.length) {
              v2?.studySemesters.forEach(() => {
                this.studySemestersFn(i, j);
              });
            }
          });
        }
      });
    }
  }

  patchData() {
    this.formItems.get('items')?.patchValue(this.itemsMock)
  }

  init() {

   
    const numberSemester =  this.dataMock[0].numberSemester;
    const regularYear =  this.dataMock[0].regularYear;

    const newForm = this.formItems?.get('items');
    (newForm as FormArray).push(this.addSingleForm())

    this.dataMock[0]['studyYears'] = []
    for (let cnt = 0; cnt < regularYear; cnt++) {
      this.studyYearsFn(0);
      this.dataMock[0]['studyYears'].push({
        studySemesters:[],
        classYearCode: "Y"+(cnt + 1),
        classYearName: "ชั้นปีที่ "+(cnt + 1)
      })
      for (let k = 0; k < numberSemester; k++) {
        this.studySemestersFn(0, cnt)
        this.dataMock[0]['studyYears'][cnt]['studySemesters'].push({
          "semester": (k+1),
          "relatedFee": null,
          "tuitionFee": null
        })
        
      }
    }


    this.formItems.get('items')?.patchValue(this.dataMock)

  }

  buildFormItem() {
    this.formItems = this.fb.group({
      items: this.fb.array([])
    })
  }

  get items(): FormArray {
    return this.formItems.get('items') as FormArray
  }

  getItems(i: number): FormArray {
    return this.items?.at(i) as FormArray
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

    this.dataMock.push({
      numberSemester: null,
      regularYear: 4
    })


    this.formItems.get('items')?.patchValue(this.dataMock)

  }

  deleteForm(index: number) {
    const form = this.formItems.get('items');
    (form as FormArray).removeAt(index)

    this.dataMock = this.formItems.get('items')?.value


  }
  delStudyYearsFn(i: number, j: number) {
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

  onSemesterChange(i: number): void {
    const numberSemester = this.items.at(i).get('numberSemester')?.value == 99 ? 2 : this.items.at(i).get('numberSemester')?.value
    const regularYear = this.items.at(i).get('regularYear')?.value


    this.delStudyYearsFn1(i);


    // if (numberSemester && regularYear) {
    //   for (let cnt = 0; cnt < regularYear; cnt++) {
    //     this.studyYearsFn(i);
    //     for (let k = 0; k < numberSemester; k++) {
    //       this.studySemestersFn(i, cnt)

    //     }
    //   }
    // }



    this.dataMock[i]['studyYears'] = []
    for (let cnt = 0; cnt < regularYear; cnt++) {
      this.studyYearsFn(i);
      this.dataMock[i]['studyYears'].push({
        studySemesters:[],
        classYearCode: "Y"+(cnt + 1),
        classYearName: "ชั้นปีที่ "+(cnt + 1)
      })
      for (let k = 0; k < numberSemester; k++) {
        this.studySemestersFn(i, cnt)
        this.dataMock[i]['studyYears'][cnt]['studySemesters'].push({
          "semester": (k+1),
          "relatedFee": null,
          "tuitionFee": null
        })
        
      }
    }


    this.formItems.get('items')?.patchValue(this.dataMock)






  }



  delStudyYearsFn1(i: number) {
    // const f1 = this.items?.at(i)
    // const f2 = f1?.get('studyYears') as FormArray
    // f2.controls = [];

    const dd = this.formItems.get('items') as FormArray;
    const dd2 = dd.at(i)?.get('studyYears') as FormArray
    dd2.controls = [];

    dd2.value.forEach((e: any, k: number) => {
      dd2.removeAt(k)
    });


    delete this.dataMock[i]['studyYears']


  }

}
