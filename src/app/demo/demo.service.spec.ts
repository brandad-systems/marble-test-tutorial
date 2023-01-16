import {RunHelpers, TestScheduler} from "rxjs/testing";
import {DemoService, MyFancyObject, MyOtherFancyObject} from "./demo.service";
import {Frame, logFrames} from "../shared/helper.spec";
import {Observable} from "rxjs";




describe('DemoService', () => {
  let myService:DemoService
  let testScheduler: TestScheduler;
  beforeEach(() => {
    myService = new DemoService();
    // boilerplate code that you always need for marble testing if you want to use the TestScheduler.run()::
    testScheduler = new TestScheduler(function (actual: Frame[], expected: Frame[]) {
      // helper function for ease of debugging:
      // uncomment, when trying to solve Task 2 when you don't understand the log output from the test of Task 2
      //logFrames('actual', actual);
      //logFrames('expected', expected);
      // asserting the two objects are equal - required
      expect(actual).toEqual(expected); // die Ausgabe hier bei Fehlern ist etwas verwirrend
    });
  });
// Task1 simple case WITHOUT using TestScheduler of Observable, complete the test so that it actually tests the DemoService.funcToBeTested()
  it('should delay the result and multiply the results by 3; test NOT yet using the TestScheduler Task1: ', function (done) {
    //arrange
    let start = Date.now();
    let timeTofirstValue = 10;
    let timeToComplete = 30;
    let del = 10;
    const coldObs2$ = new Observable<number>((subscriber) => {
      setTimeout(() => {
        subscriber.next(1);
      }, timeTofirstValue);
      setTimeout(() => {
        subscriber.complete();
      }, timeToComplete);
    });

    //act
    let obs$: Observable<number> = myService.funcToBeTested(coldObs2$,del);

    //assert
    obs$.subscribe({
      next: (value) => {
        let timePassed = Date.now() - start
        console.log("value:" + value + " time:" + (timePassed));
        // add one or more "expect()" here to make the test complete
      }, complete: () => {
        let timePassed = Date.now() - start
        console.log("complete" + " time:" + (timePassed));
        fail(); // replace one or more "expect()" here so that the test is complete
      }
    });
    setTimeout(() => {
      done()
    }, 300);
  });

//Task 2: simple case to get familiar with the syntax : fix the problem so that test gets green;
// note comment in line 17 above after running the test once
  it('should delay the result and multiply the results by 3; test using the TestScheduler', () => {
    testScheduler.run((helpers: RunHelpers) => {
      //arrange
      const {cold, expectObservable} = helpers;
      const coldObs$ = cold('         -a--b--|',{a:1,b:2});
      const wrongExpectedPattern = '-----------c--d--|';//naive guess, however: delay(x) in a pipe does NOT delay the complete!!!
      //const expectedPattern = '   -----------c--???'; //replace the ??? so that the test turns green
      const expectedValues = {c:3,d:6};
      //act
      let obsResult$: Observable<number> = myService.funcToBeTested(coldObs$,10);
      // assert
      expectObservable(obsResult$).toBe(wrongExpectedPattern,expectedValues);
    });
  });
  //Task 3: non-trivial case : fix the problem so that test gets green
  it('should delay the result map and filter the stream of Objets from the input Observable;' +
    ' test using the TestScheduler', () => {
    testScheduler.run((helpers: RunHelpers) => {
      //arrange
      const {cold, expectObservable} = helpers;
      let inputObj1 =  {
        myNumber: 1,
        myName: " mystring "
      } as MyFancyObject;
      let inputObj2 =  {
        myNumber: 2,
        myName: " mystring2 "
      } as MyFancyObject;
      let outputObj1 =  {
        myOtherNumber: 2,
        anotherName: " mystring3 "
      } as MyOtherFancyObject;
      let outputObj2 =  {
        myOtherNumber: 4,
        anotherName: " mystring4 "
      } as MyOtherFancyObject;
      const coldObs$ = cold('    -a--b--|',{a:inputObj1,b:inputObj2});
      const expectedPattern = '-----------c--d--|)'
      const expectedValues = {c:outputObj1,d:outputObj2};
      //act
      let obsResult$: Observable<MyOtherFancyObject> = myService.func4MyFancyObject(coldObs$,10);
      // assert
      expectObservable(obsResult$).toBe(expectedPattern,expectedValues);

    });
  });
});
