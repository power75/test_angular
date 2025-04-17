import { Component } from '@angular/core';

@Component({
  selector: 'app-optimizer',
  standalone: true,
  imports: [],
  templateUrl: './optimizer.component.html',
  styleUrl: './optimizer.component.scss'
})
export class OptimizerComponent {

}
//キャンペーンデータ
export class Campaign{
  constructor( 
      public id: number, //publicでクラス外からのアクセス許可
      public name: string,
      public cost: number,
      public effect: number,
  ){}
}

//今後の拡張性を考慮して予算をクラス化
export class Budget { 
  public budget: number;
  constructor(data: {budget: number}){
      this.budget = data.budget;
  }
}

//最適化処理のクラス
export class Optimizer{
  private campaigns: Campaign[]; //Campaignクラスのインスタンスを格納する配列
  private budget: Budget;

  constructor(campaigns: Campaign[], budget: Budget) {
      this.campaigns = campaigns;
      this.budget = budget; // Budgetインスタンスをプロパティとして保持
  }

  campaignEffectOptimization(){
      const numberOfCampaigns = this.campaigns.length;
      const maxbudget = this.budget.budget;
      let dp: number[][] = Array.from({ length: numberOfCampaigns+1 }, () => Array(maxbudget+1).fill(0)); //2次元配列の定義
      let select: boolean[][] = Array.from({ length: numberOfCampaigns+1 }, () => Array(maxbudget+1).fill(false)); //選択したキャンペーンを保存

      for (let i = 0; i < numberOfCampaigns; i++) {
          for (let availableCost = 0; availableCost <= maxbudget; availableCost++) {
              if (availableCost >= this.campaigns[i].cost) {
                  // キャンペーンを選択する場合としない場合の最大値を比較
                  //i番目のキャンペーンにおいてコストを払って効果を得たときの方が得なとき
                  if (dp[i][availableCost - this.campaigns[i].cost] + this.campaigns[i].effect > dp[i][availableCost]) {
                      dp[i+1][availableCost] = dp[i][availableCost - this.campaigns[i].cost] + this.campaigns[i].effect;
                      select[i+1][availableCost] = true; // このキャンペーンを選択
                  } else {
                      dp[i+1][availableCost] = dp[i][availableCost];
                      select[i+1][availableCost] = false; // このキャンペーンを選択しない
                  }
              } else {
                  // 予算が足りない場合
                  dp[i+1][availableCost] = dp[i][availableCost];
                  select[i+1][availableCost] = false; // このキャンペーンを選択しない
              }
          }
      }
      //キャンペーンを復元
      let selectedPlans: string[] = [];
      let remainingBudget = maxbudget;
      let maxBenefit = dp[numberOfCampaigns][maxbudget]
      for(let i = numberOfCampaigns; i > 0; i--){
          if(select[i][remainingBudget]){
              selectedPlans.push(this.campaigns[i-1].name);
              remainingBudget -= this.campaigns[i-1].cost;
          }
      }
      console.log("最大効果:", maxBenefit);
      console.log(selectedPlans.reverse());
  }
}

try { 
  //try-catch
  // インスタンス生成
  //id?として存在しない場合はundefinedとして扱う
  const campaigns = data.campaigns.map((c: { id?: number; name?: string; cost?: number; effect?: number }) => {
      if (typeof c.id !== "number"){
          throw new Error(`キャンペーンデータが不正です。idが無効です。`);
      } else if (typeof c.name !== "string") {
          throw new Error(`キャンペーンデータが不正です。nameが無効です。`);
      } else if (typeof c.cost !== "number") {
          throw new Error(`キャンペーンデータが不正です。costが無効です。`);
      } else if (typeof c.effect !== "number") {
          throw new Error(`キャンペーンデータが不正です。effectが無効です。`);
      }
      return new Campaign(c.id, c.name, c.cost, c.effect);
  });

  if(typeof data.budget !== "number" || data.budget <= 0 ){
      throw new Error('予算は正の整数で入力してください。')
  }

  const budget = new Budget(data);

  const optimizer = new Optimizer(campaigns, budget);

  // 関数呼び出し
  optimizer.campaignEffectOptimization();
} catch (error: any) {
  // エラーが発生した場合にメッセージを返す
  console.error("エラーが発生しました。", error.message);
  console.log("jsonファイルが正しいか確認してください。");
}
