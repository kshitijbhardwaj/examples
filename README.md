<base-dialog [dialogTitle]="dialogTitle" id="customer-profile-popup" class="customer-profile-popup">
    <customer-profile-popup-content fxFill [customerId]="data"></customer-profile-popup-content>
</base-dialog>

encapsulation: ViewEncapsulation.None

@Component({
    selector: 'customer-profile-popup',
    templateUrl: './customer-profile-popup.component.html',
    styleUrls: ['./customer-profile-popup.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CECustomerProfilePopupComponent {

    bundle: string = BundleUtil.CUSTOMER_DASHBOARD_BUNDLE;
    dialogTitle: string = "";

    constructor(@Inject(MAT_DIALOG_DATA) public data: { customer: any },
                private translateService: CETranslateService,
                public dialogRef: MatDialogRef<CECustomerProfilePopupComponent>) { }

    ngOnInit() {
        this.dialogTitle = this.translateService.translate('CustomerProfile_UC', this.bundle);
    }

}

===================


import { Component, Input, ViewContainerRef, ViewChild, ElementRef, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { BundleUtil } from '../../services/common/util/bundle.util';
import { Customer } from '../../services/common/model/customer';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatMenuTrigger } from "@angular/material";
import { CECustomerProfilePopupComponent } from '../customer-profile-popup/customer-profile-popup.component';
import { CECustomerActivationDeactivationPopupComponent } from '../customer-activation-deactivation-popup/customer-activation-deactivation-popup.component';
import { CustomerProfileResources } from '../../util/resources/customer-profile.resources';
import { CESecurityScopeService } from '../../services/common/security-scope/security-scope.service';
import { CEFeatureFlagService } from '../../services/common/feature-flag/feature-flag.service';
import { FeatureFlagConstants } from '../../services/common/feature-flag/feature-flag.constants';
import { CEMessageChannelService } from '../../services/message-channel.service';

@Component({
    selector: 'ce-customer-profile-menu',
    templateUrl: './customer-profile-menu.component.html',
    styleUrls: ['./customer-profile-menu.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CECustomerProfileMenuComponent {
    bundle: string = BundleUtil.CUSTOMER_DASHBOARD_BUNDLE;

    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    @ViewChild('customerProfileMenu') triggerEl: ElementRef;
    customerProfileDialog: MatDialogRef<CECustomerProfilePopupComponent>;
    deactivateActivateProfileDialog: MatDialogRef<CECustomerActivationDeactivationPopupComponent>;
    customerProfileDialogConfig: MatDialogConfig = new MatDialogConfig();
    deactivateActivateProfileDialogConfig: MatDialogConfig = new MatDialogConfig();
    @Input() customer: Customer;
    hasActivateGrant: boolean = this.hasPermission(CustomerProfileResources.CUSTOMER_ACTIVATE_MENU_ITEM);
    hasDeactivateGrant: boolean = this.hasPermission(CustomerProfileResources.CUSTOMER_DEACTIVATE_MENU_ITEM);


    constructor(public mdDialog: MatDialog,
        private viewContainerRef: ViewContainerRef,
        private ceSecurityScopeService: CESecurityScopeService,
        private featureFlagService: CEFeatureFlagService,
        private messageChannelService: CEMessageChannelService) {
    }

    viewProfile() {
        this.customerProfileDialogConfig = {
            viewContainerRef: this.viewContainerRef,
            disableClose: true,
            width: '80vw',
            height: '80vh',
            panelClass: 'customerProfile-popup-panel',
            data: {
                customerId: this.customer.CustomerId
            }
        };
        this.customerProfileDialog = this.mdDialog.open(CECustomerProfilePopupComponent, this.customerProfileDialogConfig);
    }

    deactivateActivateProfile() {
        this.deactivateActivateProfileDialogConfig = {
            viewContainerRef: this.viewContainerRef,
            disableClose: true,
            width: '25vw',
            height: '40vh',
            panelClass: 'customerProfile-popup-panel',
            data: {
                customer: this.customer
            }
        };
        this.deactivateActivateProfileDialog = this.mdDialog.open(CECustomerActivationDeactivationPopupComponent, this.deactivateActivateProfileDialogConfig);

        this.deactivateActivateProfileDialog.afterClosed().subscribe(customer => {
            if (customer) {
                this.messageChannelService.setCustomerData(customer);
            }

        });
    }

    /**This will check if the user is haivng the given permission*/
    hasPermission(permission: string) {
        var hasPermission: boolean = true;
        var grantsFeatureFlag: boolean = this.featureFlagService.getFeatureFlag(FeatureFlagConstants.CUSTOMER_PROFILE_GRANT);
        //Do not honour the permissions if the feature flag for grants is disabled
        if (grantsFeatureFlag) {
            hasPermission = this.ceSecurityScopeService.hasUserGrant(permission);
        }

        return hasPermission;
    }

}
