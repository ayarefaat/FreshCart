import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _router=inject(Router);
  if(sessionStorage.getItem('token')){
    return true;
  }else{
    _router.navigate(['/auth/login'])
    return false
  }
};
