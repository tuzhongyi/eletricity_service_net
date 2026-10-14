import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[text-space-between]',
})
export class TextSpaceBetweenDirective implements AfterContentInit {
  @Input() value: string = '';
  @Input() suffix: string = '';
  /** true 时连着的字母数字算一个词，不拆成一个字母一格 */
  @Input() keepword: boolean = false;
  constructor(e: ElementRef) {
    this.ele = e.nativeElement;
  }
  private ele: HTMLInputElement;

  ngAfterContentInit(): void {
    if (this.ele) {
      this.ele.style.display = 'flex';
      this.ele.style.justifyContent = 'space-between';
      let value = '';
      if (this.value) {
        value = this.value;
      } else if (this.ele.innerText) {
        value = this.ele.innerText;
        this.ele.innerHTML = '';
      }
      if (value) {
        this.create(value.trim());
      }
    }
  }

  private create(value: string) {
    let items = this.keepword ? this.words(value) : value.split('');
    for (let i = 0; i < items.length; i++) {
      let div = document.createElement('div');
      div.innerHTML = items[i];
      if (this.suffix && i == items.length - 1) {
        div.innerHTML += this.suffix;
      }
      this.ele.appendChild(div);
    }
  }

  /** 字母数字连着的一段算一个词（中间的 . : / _ @ - 也不断开），空白丢掉，其余按字拆 */
  private words(value: string) {
    return value.match(/[A-Za-z0-9]+(?:[.:\/_@-][A-Za-z0-9]+)*|\S/g) ?? [];
  }
}
