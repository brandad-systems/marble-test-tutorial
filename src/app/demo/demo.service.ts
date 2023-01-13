import { Injectable } from '@angular/core';
import {delay, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  constructor() { }
 public funcToBeTested (obs:Observable<number>,del:number ):Observable<number> {
    return obs.pipe(delay(del),map(a=>a*3));
 }
}
