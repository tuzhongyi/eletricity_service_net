export class PeopleStrangerListItemImageController {
  hover = false;

  onmouseover() {
    if (this.hover) return;
    this.hover = true;
  }
  onmouseout() {
    if (this.hover) {
      this.hover = false;
    }
  }
}
