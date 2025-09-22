import { HttpInterceptorFn } from '@angular/common/http';
import { SharedService } from '../services/shared.service';
import { inject } from '@angular/core';

export const reqHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const token=inject(SharedService).getToken()

  if(token){
    // console.log(token)
    req=req.clone({
      setHeaders:{token :`${token}` }
    })
  }
  return next(req);
};
