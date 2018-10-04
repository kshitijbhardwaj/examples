openSnackBar(message: string) {
        this.config.duration = 3000;
        this.config.direction = 'ltr';
        this.snackBar.open(message, '', this.config);
    }
    
    import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
config : MatSnackBarConfig = new MatSnackBarConfig();
private snackBar: MatSnackBar,
