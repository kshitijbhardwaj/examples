
mat-radio-button {
  margin-right: 2rem;
  .mat-radio-outer-circle {
    border-color: $shreshtha-radio-default-base !important;
  }

  .mat-radio-inner-circle {
    background: $shreshtha-radio-default-base !important;
  }

  &.mat-radio-disabled {
    .mat-radio-outer-circle {
      border-color: $shreshtha-radio-disabled-base !important;
    }

    .mat-radio-inner-circle {
      background: $shreshtha-radio-disabled-base !important;
    }
  }

  &.solid-radio-button {
    .mat-radio-outer-circle {
      border: .1rem solid $shreshtha-radio-solid-base !important;
      background: transparent;
    }
    &.mat-radio-checked {
      .mat-radio-outer-circle {
        background: $shreshtha-radio-solid-base;
      }
    }
    .mat-radio-inner-circle {
      display: none;
    }
    .mat-radio-label-content {
      color: $shreshtha-radio-label-color;
      padding-left: .4rem;
      top: 0;
    }
  }
}
