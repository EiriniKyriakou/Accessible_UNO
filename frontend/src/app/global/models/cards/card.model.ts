export class CardModel {

    public name!: string;
    public number!: string;
    public dysrhythmia!:boolean;
  
    constructor(model?: any) {
      Object.assign(this, model);
    }
  }
  
  