import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Star-Global-test-exam';
  transitionSpeed: number = 1;
  @ViewChild('box', { static: false }) box: ElementRef;
  @ViewChild('area', { static: false }) area: ElementRef;

  changeSpeedSubject$ = new Subject();
  unSubscribe$ = new Subject();

  ngOnInit(): void {
    this.changeSpeedSubject$.pipe(
      takeUntil(this.unSubscribe$),
      debounceTime(400)
    ).subscribe(() => {
      this.box.nativeElement.style.transition = `${this.transitionSpeed ?? 0}s linear`;
    });
  }

  move(event: any): void {
    const clientX = event.clientX - this.area.nativeElement.offsetLeft;
    const clientY = event.clientY - this.area.nativeElement.offsetTop;
    this.box.nativeElement.style.transform = `translate(${clientX}px, ${clientY}px)`;
  }

  changeSpeed(): void {
    this.changeSpeedSubject$.next();
  }

  ngOnDestroy(): void {
    this.unSubscribe$.complete();
  }
}
