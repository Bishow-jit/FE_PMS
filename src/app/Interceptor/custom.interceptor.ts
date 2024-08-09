import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const excludedUrls = ['/api/v1/registration','/api/v1/login'];

  // Check if the request URL is in the excluded URLs
  if (excludedUrls.some(url => req.url.includes(url))) {
    return next(req); // Skip the interceptor
  }


  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      const clonereq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(clonereq);
    }
  }

  console.log("no token available")
  return next(req);
};
