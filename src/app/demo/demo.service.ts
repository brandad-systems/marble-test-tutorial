import {Injectable} from '@angular/core';
import {delay, filter, map, Observable} from "rxjs";

export interface MyFancyObject {
  myNumber: number;
  myName: string;
}

export interface MyOtherFancyObject {
  myOtherNumber: number;
  anotherName: string;
}

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  constructor() {
  }

  public funcToBeTested(obs: Observable<number>, del: number): Observable<number> {
    return obs.pipe(delay(del), map(a => a * 3));
  }

  public func4MyFancyObject(obs: Observable<MyFancyObject>, del: number): Observable<MyOtherFancyObject> {
    return obs.pipe(delay(del), map(obj => {
        return {
          myOtherNumber: obj.myNumber + 1,
          anotherName: obj.myName + " is nice"
        } as MyOtherFancyObject
      }),
      filter((obj:MyOtherFancyObject) => {
          if (obj.myOtherNumber % 2 !== 1) {
            return false;
          } else {
            return true;
          }
        }
      )
    );
  }
}
