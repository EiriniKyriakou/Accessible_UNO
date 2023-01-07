export class CardModel {

  public color!: string;
  public number!: string;
  public dysrhythmia!: boolean;
  public colorblindness!: boolean;
  public dyslexia!: boolean;

  constructor(model?: any) {
    Object.assign(this, model);
  }
}

