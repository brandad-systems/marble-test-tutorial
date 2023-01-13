import {RunHelpers, TestScheduler} from "rxjs/testing";
import {DemoService} from "./demo.service";
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
      logFrames('actual', actual);
      logFrames('expected', expected);
      // asserting the two objects are equal - required
      expect(actual).toEqual(expected); // die Ausgabe hier bei Fehlern ist etwas verwirrend
    });
  });

  it('Task1: simple case WITHOUT using TestScheduler of Observable', function (done) {
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


  it('Task 2: simplest case to get familiar with the syntax : fix the problem', () => {
    testScheduler.run((helpers: RunHelpers) => {
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
});
