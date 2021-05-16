export class SelectCategory {
  constructor(obj?) {
    if (obj) {
      this.id = obj.id;
      this.name = obj.name;
      this.isSelected = obj.isSelected;
    }
  }

  id: number;
  name: string;
  isSelected: boolean;
}
