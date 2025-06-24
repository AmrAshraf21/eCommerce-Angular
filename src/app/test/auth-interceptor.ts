import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const clone = req.clone({
    setHeaders:{
      authorization:"Bearer test"
    }
  })

  return next(clone);
};
