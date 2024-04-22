import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'dialog-overview-example.html',
})
export class DialogOverviewExample {
  animalOptions: string[] = ['Dog', 'Cat', 'Bird', 'Fish'];
  inputValue: string;
  selectedAnimal: string;
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.componentInstance.animalSelected.subscribe((selectedAnimal: string) => {
      console.log('The animal was selected:', selectedAnimal);
      this.animal = selectedAnimal;
    });
  }
  onAnimalSelected(selectedAnimal: string): void {
    this.animal = selectedAnimal;
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  animalForm: FormGroup;
  selectedAnimal: string;
  animalOptions: string[] = ['Dog', 'Cat', 'Bird', 'Fish'];
  @Output() animalSelected: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
  ) {
    this.animalForm = this.fb.group({
      animal: data.animal
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.animalForm.valid) {
      const selectedAnimal = this.animalForm.value.animal;
      this.dialogRef.close(selectedAnimal);
      this.animalSelected.emit(selectedAnimal);
    }
  }
}

/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
