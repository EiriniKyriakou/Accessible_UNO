export class GameModel {
    public _id!: string; // generated by mongoDB
    public createdAt!: Date; // generated by mongoDB
    public updatedAt!: Date; // generated by mongoDB
    public cards_on_deck!: string[];
    public played_cards!: string[];
    public players!: string[];
    public turn!: string;
    public last_card!: string;
    public current_player!: string;
    public dysrhythmia!: boolean;
    public dyslexia!: boolean;
    public impairedVision!: boolean;
    public active!: boolean;
  
    constructor(model?: any) {
      Object.assign(this, model);
    }
  }
  