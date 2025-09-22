import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if(typeof localStorage!="undefined"){
    const _router=inject(Router);
    if(localStorage.getItem('token')&& localStorage.getItem('userID')){
      return true;
    }else{
      _router.navigate(['/login'])
      return false
    }
  }else{
    return  false;
  }
};
