export class CardModel {

    public name!: string;
    public number!: string;
  
    constructor(model?: any) {
      Object.assign(this, model);
    }
  }
  
  