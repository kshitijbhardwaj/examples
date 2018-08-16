# examples
<form #addAddressForm="ngForm" fxLayout="column" (ngSubmit)="onSubmit(addAddressForm.valid)">
    <div fxLayout="row">
        <mat-form-field class="mr-2">
            <input class="add-address-input" matInput [(ngModel)]="addAddress.FirstName" name="firstName" #firstName="ngModel" required
                placeholder="{{'firstName_UC'}}">
            <mat-error *ngIf="firstName.invalid">{{'required_error'}}</mat-error>
        </mat-form-field>
        <mat-form-field>
            <input matInput [(ngModel)]="addAddress.LastName" name="lastName" #lastName="ngModel" required placeholder="{{'lastName_UC'}}">
            <mat-error *ngIf="lastName.invalid">{{'required_error'}}</mat-error>
        </mat-form-field>
    </div>
    <mat-form-field>
        <input matInput [(ngModel)]="addAddress.AddressLine1" [name]="addressLine1" #addressLine1="ngModel" required placeholder="{{'addressLine1_UC'}}">
        <mat-error *ngIf="addressLine1.invalid">{{'required_error'}}</mat-error>
    </mat-form-field>
    <mat-form-field>
        <input matInput [(ngModel)]="addAddress.AddressLine2" name="addressLine2" #addressLine2="ngModel" placeholder="{{'addressLine2_UC'}}">
    </mat-form-field>
    <mat-form-field>
        <input matInput [(ngModel)]="addAddress.AddressLine3" name="addressLine3" #addressLine3="ngModel" placeholder="{{'addressLine3_UC'}}">
    </mat-form-field>
    <div fxLayout="row">
        <mat-form-field class="mr-2">
            <input matInput [(ngModel)]="addAddress.City" name="city" #city="ngModel" required placeholder="{{'city_UC'}}">
            <mat-error *ngIf="city.invalid">{{'required_error'}}</mat-error>
        </mat-form-field>
        <div fxLayout="column">
            <mat-form-field>
                <mat-select [(ngModel)]="addAddress.StateProv" name="stateProv" #stateProv="ngModel" required placeholder="{{'state_UC'}}">
                    <mat-option *ngFor="let state of stateData" [value]="state.StateId">
                        {{ state.StateId }}
                    </mat-option>
                </mat-select>
                <mat-error *ngIf="stateProv.invalid">{{'required_error'}}</mat-error>
            </mat-form-field>
        </div>
    </div>
    <div fxLayout="row">
        <mat-form-field class="mr-2">
            <input matInput [(ngModel)]="addAddress.PostalCode" required name="zip" #zip="ngModel" placeholder="{{'zip_UC'}}">
            <mat-error *ngIf="zip.invalid">{{'required_error'}}</mat-error>
        </mat-form-field>
        <mat-form-field>
            <mat-select required [(ngModel)]="addAddress.Country" (change)="onCountryChnage()" name="country" #country="ngModel" placeholder="{{'country_UC'}}">
                <mat-option *ngFor="let country of countryData" [value]="country.CountryId">
                    {{ country.CountryName }}
                </mat-option>
            </mat-select>
            <mat-error *ngIf="country.invalid">{{'required_error'}}</mat-error>
        </mat-form-field>
    </div>
    <div fxLayout="row">
        <mat-form-field class="mr-2">
            <input matInput name="email" #email="ngModel" [(ngModel)]="addAddress.Email" placeholder="{{'email_UC'}}">
            <mat-error *ngIf="email.invalid">{{'email_error'}}</mat-error>
        </mat-form-field>
        <mat-form-field>
            <input matInput [(ngModel)]="addAddress.Phone" maxlength="15" (keyup)="formatPhoneNumber(addAddress.Phone)" name="phone" #phone="ngModel" placeholder="{{'phone_UC'}}">
        </mat-form-field>
    </div>
    <div *ngIf="!isReturnorder">
        <mat-checkbox class="secondary-checkbox-style text-normal" [(ngModel)]="useThis" name="useThis" disableRipple>{{'use_as_billing_address'}}</mat-checkbox>
    </div>
    <div fxLayout="row" fxLayoutAlign="end end" *ngIf="updateFlag">
        <button mat-button class="cta-secondary mr-1" type="button" (click)="addAddressForm.resetForm()">{{'Reset_UC'}}</button>
        <button mat-button (click)="cancel()" type='button' class="cta-secondary mr-1">{{'Cancel_UC'}}</button>
        <button mat-button [disabled]="!addAddressForm.valid" type="button" (click)="sendAddress()" class="cta-primary">{{'update_UC'}}</button>
    </div>
    <div fxLayoutAlign="end end" *ngIf="!updateFlag && !isReturnorder">
        <button mat-button class="cta-secondary mr-1" (click)="addAddressForm.resetForm()">{{'Reset_UC'}}</button>
        <button mat-button class="cta-primary mr-1" [disabled]="!addAddressForm.valid" (click)="sendAddress($event)">{{'use_this_UC'}}</button>
    </div>
    <div fxLayout="row" *ngIf="isReturnorder" fxLayoutAlign="end end">
        <div>
            <button mat-button class="cta-secondary my-2" type="button" (click)="addAddressForm.resetForm()">{{'Reset_UC'}}</button>
        </div>
        <div>
            <button mat-button type='button' (click)="cancelEdit()" class="cta-secondary m-2">{{('Cancel_UC' | translate:bundle)|uppercase}}</button>
        </div>
        <div>
            <button mat-button [disabled]="!addAddressForm.valid" type="button" (click)="updateAddress()" class="cta-primary my-2">{{('update_UC' | translate:bundle)|uppercase}}</button>
        </div>
    </div>
</form>
