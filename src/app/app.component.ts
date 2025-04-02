import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Item } from "./item";
import { ItemComponent } from "./item/item.component";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, ItemComponent],
})
export class AppComponent {
  componentTitle = "My To Do List";

  filter: "all" | "active" | "done" = "all"; 
  //union型、3つのどれかの文字列を持つ。初期値all
  
  allItems = [
    { description: "eat", done: true },
    { description: "sleep", done: false },
    { description: "play", done: false },
    { description: "laugh", done: false },
  ];

  addItem(description: string) {
    if (!description) return;

    this.allItems.unshift({//unshiftで配列の先頭に要素を追加。引数descriptinでdoneは常にfalse
      description,
      done: false
    });
  }

  get items() {
    if (this.filter === "all") {
      return this.allItems; //filterがallなら全てのItem配列を返す。
    }
    return this.allItems.filter((item) =>
      this.filter === "done" ? item.done : !item.done 
    ); //this.filterがdoneならdone: trueの配列を返す。
  }    //それ以外ならdone: falseの配列を返す。

  remove(item: Item) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }
  
}
