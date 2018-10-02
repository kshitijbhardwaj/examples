constructor(private confirmationDialog: MatDialogRef<CEConfirmationDialogComponent>) { }

    onCancel(event){
        this.confirmationDialog.close(false);
    }
    onOk(event){
      this.confirmationDialog.close(true);  
    }
