<div class="base-dialog">
    <div class="dialog-header">
        <span class="dialog-title"> {{ dialogTitle }} </span>
        <div class="dialog-close"><i class="material-icons clear-icon" (click)="dialogRef.close(false)">clear</i></div>
    </div> 
    <div class="dialog-container">
        <ng-content></ng-content>
    </div>
</div>

import { Component, Input, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material'
import { FormGroup } from '@angular/forms'

@Component({
    selector: 'base-dialog',
    templateUrl: './base-dialog.component.html',
    styleUrls: ['./base-dialog.component.css']
})
export class CEBaseDialogComponent implements OnInit {

    @Input() dialogTitle: string;
    dialogClass: string = 'cs-dialog';

    constructor(public dialogRef: MatDialogRef<CEBaseDialogComponent>) { }

    ngOnInit() {
        /*
            Since the material dialog uses common container div outside that is common for everybody.
            We add the class this way to avoid global styles that will affect others

            Also since multiple popups can be shown at a time, we apply the custom class only to the latest created mat-dialog-container
            which happens to be the parent of this component.

            We do not remove the class on closing the popup as the mat-dialog-container associated to the popup is removed once we close the popup.
        */
        let mdDialogContainerEls = this.getMaterialDialogContainerEls();
        if (mdDialogContainerEls.length) {
            var last = mdDialogContainerEls.length - 1;
            var lastMdDialogEl = mdDialogContainerEls[last];
            lastMdDialogEl && lastMdDialogEl.classList.add(this.dialogClass);
        }

    }

    getMaterialDialogContainerEls() {
        return Array.prototype.slice.call(document.getElementsByTagName('mat-dialog-container'));
    }
}

.dialog-container {
    font-size: 1.4rem;
    flex: 1;
    overflow: auto;
}

.dialog-close{
    cursor: pointer;
}

.dialog-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 1rem 1.3rem .5rem 1.3rem;
}

.dialog-title {
    font-size: 1.2rem;
}

.base-dialog {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.clear-icon {
    font-size: 1.3rem;
}
