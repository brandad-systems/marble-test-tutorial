import {of} from "rxjs";
import {fakeAsync, tick, waitForAsync} from "@angular/core/testing";
import {DemoService} from "./demo.service";
import {TestScheduler} from "rxjs/testing";

describe('Handout', () => {
  let myService: DemoService
  let testScheduler: TestScheduler;

  beforeEach(() => {
    myService = new DemoService();
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('the cake is a lie', () => {
    const inputValue = 10;
    const delay = 500;
    const expectedValue = 30;
    const start = Date.now();

    myService.funcToBeTested(of(inputValue), delay).subscribe({
      next: (value) => {
        let timeElapsed = Date.now() - start;
        console.log(`the cake is a lie => timeElapsed: ${timeElapsed}ms`);

        expect(timeElapsed).toBeGreaterThanOrEqual(delay);
        expect(value).toBe(expectedValue);
      }
    });
  });

  // TASK 1 mit fakeAsync()
  it('waitForAsync()', waitForAsync(() => {
    const inputValue = 10;
    const delay = 500;
    const expectedValue = 30;
    const start = Date.now();

    myService.funcToBeTested(of(inputValue), delay).subscribe({
      next: (value) => {
        let timeElapsed = Date.now() - start;
        console.log(`waitForAsync => timeElapsed: ${timeElapsed}ms`);

        expect(timeElapsed).toBeGreaterThanOrEqual(delay);
        expect(value).toBe(expectedValue);
      }
    });
  }));

  it('done()', (done) => {
    const inputValue = 10;
    const delay = 500;
    const expectedValue = 30;
    const start = Date.now();

    myService.funcToBeTested(of(inputValue), delay).subscribe({
      next: (value) => {
        let timeElapsed = Date.now() - start;
        console.log(`done => timeElapsed: ${timeElapsed}ms`);

        expect(timeElapsed).toBeGreaterThanOrEqual(delay);
        expect(value).toBe(expectedValue);
        done();
      }
    });
  });

  it('fakeAsync()', fakeAsync(() => {
    const inputValue = 10;
    const delay = 500;
    const expectedValue = 30;

    let output = 0;
    myService.funcToBeTested(of(inputValue), delay).subscribe(value => output = value);

    tick(499);
    expect(output).toBe(0);
    console.log(`fakeAsync => 499ms | output: ${output}`);

    tick(1);
    expect(output).toBe(expectedValue);
    console.log(`fakeAsync => 500ms | output: ${output}`);
  }));

  it('Marble Diagram', () => {
    const inputValue = 10;
    const delay = 500;
    const expectedOutput = 30;

    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;
      const expected = '500ms (a|)';
      const expectedValues = {a: expectedOutput};

      const result$ = myService.funcToBeTested(of(inputValue), delay);

      expectObservable(result$).toBe(expected, expectedValues);

      console.log(`Marble Diagram => 500ms | output: ${expectedOutput}`);
    });

  });
});
