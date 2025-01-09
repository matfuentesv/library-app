import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {MsalService} from '@azure/msal-angular';
import {AuthenticationResult} from '@azure/msal-browser';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private msalService: MsalService,
              private authService: MsalService) {}

  usuarioEstaConectado(): boolean {
    return this.msalService.instance.getActiveAccount() !== null;
  }



  iniciarSesion(): void {
    this.msalService.loginPopup()
      .subscribe((response: AuthenticationResult) => {
        this.msalService.instance.setActiveAccount(response.account);

        this.msalService.acquireTokenSilent({ scopes: [] }).subscribe({
          next: (tokenResponse) => {
            localStorage.setItem('jwt', tokenResponse.idToken);
          }
        });
        this.obtenerUsuario();
      });
  }

  obtenerUsuario(): string {
    if (this.authService.instance.getActiveAccount() == null) {
      return 'error';
    }
    // @ts-ignore
    return this.authService.instance.getActiveAccount().name;
  }

  cerrarSesion(): void {
    this.msalService.logout();
    console.log('User logged out');
  }

}
