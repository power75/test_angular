import { Component, Input, Output, EventEmitter } from '@angular/core'; //appComponentとデータを共有できる
import { CommonModule } from "@angular/common"; //@ifなどが使える
import { Item } from "../item"; //コンポーネントにitemが何かを理解できる。

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],//@ifなどが使える
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  editable = false;

  @Input() item!: Item; //プロパティの値がコンポーネントの外部から取得できるようにする
  @Output() remove = new EventEmitter<Item>(); //プロパティの値がコンポーネントから別のコンポーネントへ移せるようにする

  saveItem(description: string) {
    if (!description) return;

    this.editable = false;
    this.item.description = description;
  }
}
