export class PlayerModel {
  public username!: string;
  public password!: string;
  public avatar!: string;
  public wins!: number;
  public games!: number;
  public dysrhythmia!: boolean;
  public dyslexia!: boolean;
  public impairedVision!: boolean;

  constructor(model?: any) {
    Object.assign(this, model);
  }
}

