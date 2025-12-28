import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyServiceService } from '../services/busy-service.service';
import { delay, finalize, of, tap } from 'rxjs';

const cache = new Map<String, any>();

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyServiceService);

  if(req.method === 'GET'){
    const cachedResponse = cache.get(req.url);
    if(cachedResponse){
      return of(cachedResponse);
    }
  }

  busyService.busy();

  return next(req).pipe(
    delay(500),
    tap(response => {
      cache.set(req.url, response)
    }),
    finalize(() => {
      busyService.idle()
    })
  )
};
