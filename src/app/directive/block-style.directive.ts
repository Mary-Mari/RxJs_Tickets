import {OnInit, Directive, ElementRef, AfterViewInit, EventEmitter,  Input, Output, SimpleChanges, OnChanges,
} from '@angular/core';
import  {ITour} from "../models/tours";


@Directive({
  selector: '[appBlockStyle]',
  host: {
    '(document:keyup)': 'initKeyUp($event)'
  },
  exportAs: 'blockStyle'
})
export class BlockStyleDirective implements OnInit, AfterViewInit, OnChanges {
  @Input() selector: string;
  @Input() initFirst: boolean = false;
  @Output() renderComplete = new EventEmitter();
  tours: ITour[] = [];
  private items: ITour[];
  private index: number = 0;
  public activeElementIndex: number;
  $event: KeyboardEvent;
  showFilteredResults: boolean = false;


  constructor(private el: ElementRef,
             ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {


  }

  ngAfterViewInit() {
    this.activeElementIndex = 0
    if (this.selector) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      if (this.items[0]) {
        (this.items[0] as unknown as HTMLElement).setAttribute('style', 'border: 2px solid red')
      }
    } else {
      console.error('Не передан селектор');
    }
    setTimeout(() => {
      this.renderComplete.emit(true);
    });
  }
  initKeyUp(ev: KeyboardEvent): void {
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
      let newIndex = this.index;

      if (ev.key === 'ArrowRight') {
        newIndex++;
      } else if (ev.key === 'ArrowLeft') {
        newIndex--;
      }

      if (newIndex >= 0 && newIndex < this.items.length  ) {
        if (this.items[this.index]) {
          (this.items[this.index] as unknown as HTMLElement).removeAttribute('style');
        }

        this.index = newIndex;

        if (this.items[this.index]) {
          (this.items[this.index] as unknown as HTMLElement).setAttribute('style', 'border: 2px solid red');
          this.activeElementIndex = this.index;
        }
      } else {
        console.error('Ошибка: Индекс находится вне допустимого диапазона');
      }
    }}
  initStyle(index:number) {
    if(this.items[index]) {
      (this.items[index] as unknown as HTMLElement).setAttribute('style', 'border: 2px solid red')
      this.activeElementIndex = this.index;
    }
  }

  updateItems(): void {
    this.items = this.el.nativeElement.querySelectorAll(this.selector);
  }
}



