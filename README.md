
<div fxFlex fxLayout="row" id="customer-profile-main-content-section" class="customer-profile-main-content-section" ma-extension-screen-id="ce::customer-profile-popup">
    <div fxFlex="20" fxLayout="column" id="customer-profile-tab" class="customer-profile-tab">

        <div fxLayout="row" fxLayoutAlign="start center" class="tab" [class.highlighted-tab]="checkIfSelected(1)">
            <i class="material-icons">account_box</i>
            <button id="about-tab" (click)="showTabDetails(1)">{{'About_TC' | translate:bundle }}</button>
        </div>

        <div fxLayout="row" fxLayoutAlign="start center" class="tab" [class.highlighted-tab]="checkIfSelected(2)">
            <i class="material-icons">contact_phone</i>
            <button id="contact-tab" (click)="showTabDetails(2)">{{'Contact_TC' | translate:bundle }}</button>
        </div>

        <div fxLayout="row" fxLayoutAlign="start center" class="tab" [class.highlighted-tab]="checkIfSelected(3)">
            <i class="material-icons">home</i>
            <button id="address-tab" (click)="showTabDetails(3)">{{'Address_TC' | translate:bundle }}</button>
        </div>

        <div fxLayout="row" fxLayoutAlign="start center" class="tab" [class.highlighted-tab]="checkIfSelected(4)">
            <i class="material-icons">payment</i>
            <button id="payment-tab" (click)="showTabDetails(4)">{{'Payment_TC' | translate:bundle }}</button>
        </div>

        <div fxLayout="row" fxLayoutAlign="start center" class="tab" [class.highlighted-tab]="checkIfSelected(5)">
            <i class="material-icons">settings_applications</i>
            <button id="preference-tab" (click)="showTabDetails(5)">{{'Preferences_TC' | translate:bundle }}</button>
        </div>

    </div>
    <div fxFlex="70" fxLayout="row" class="customer-profile-tab-content" id="customer-profile-tab-content">
        <ce-progress-spinner fxFill *ngIf="isLoading" class="customer-profile-tab-content-popup"></ce-progress-spinner>
        <div fxFill class="customer-profile-tab-content-popup" *ngIf="customerData && !isLoading" #customerProfileContent>

            <div id="customerProfileAbout" class="customerProfileAbout" *ngIf="activeTab === 1">
                <customer-profile-about-tab [customer]="customerData" (updateCustomerData)="updateCustomerData($event)"></customer-profile-about-tab>
            </div>

            <div id="customerProfileContact" *ngIf="activeTab === 2">
                <customer-profile-contact-tab [customer]="customerData" (updateCustomerData)="updateCustomerData($event)"></customer-profile-contact-tab>
            </div>

            <div id="customerProfileAddress" *ngIf="activeTab === 3">
                <customer-profile-address-tab [customer]="customerData" (updateCustomerData)="updateCustomerData($event)"></customer-profile-address-tab>
            </div>

            <div id="customerProfilePayment" *ngIf="activeTab === 4">
                <customer-profile-payment-tab [customer]="customerData" (updateCustomerData)="updateCustomerData($event)"></customer-profile-payment-tab>
            </div>

            <div id="customerProfilePreference" *ngIf="activeTab === 5">
                <customer-profile-preference-tab [customer]="customerData" [shippingMethodId]=shippingMethodId (updateCustomerData)="updateCustomerData($event)"></customer-profile-preference-tab>
            </div>

        </div>
    </div>
    <div fxFlex="10"></div>
</div>


checkIfSelected(tabIndex){
        return (tabIndex === this.activeTab);
    }
