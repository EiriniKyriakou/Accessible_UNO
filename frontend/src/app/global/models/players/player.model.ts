export class PlayerModel {
  public _id!: string;
  public username!: string;
  public password!: string;
  public avatar!: string;
  public wins!: number;
  public games!: number;
  public dysrhythmia!: boolean;
  public dyslexia!: boolean;
  public impairedVision!: boolean;
  public colorblindness!: boolean;
  public unos!: number;
  public wild_cards !:number;
  public score!: number;
  public cards_hand!: string[];

  constructor(model?: any) {
    Object.assign(this, model);
  }
}

