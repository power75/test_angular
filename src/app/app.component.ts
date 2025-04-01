import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule],
})
export class AppComponent {
  componentTitle = "My To Do List";

  filter: "all" | "active" | "done" = "all";

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
}
