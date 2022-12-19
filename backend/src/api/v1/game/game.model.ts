import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface IGame extends Document {
  cards_on_deck: string[];
  played_cards: string[];
  players: string[];
  turn: string;
  last_card: string;
  current_player: string;
  dysrhythmia: boolean;
  dyslexia: boolean;
  impairedVision: boolean;
  colorblindness: boolean;
  active: boolean;
}

// ------------------------------------------
// Schema definition
const gameSchema = new Schema(
  {
    cards_on_deck: {type: Array<string>, required: true},
    played_cards: {type: Array<string>, required: true},
    players: {type: Array<string>, required: true},
    turn: {type: String, required: true},
    last_card: {type: String, required: true},
    current_player: {type: String, required: true},
    dysrhythmia: {type: Boolean, required: true},
    dyslexia: {type: Boolean, required: true},
    impairedVision: {type: Boolean, required: true},
    colorblindness: {type: Boolean, required: true},
    active: {type: Boolean, required: true}
  },
  { ...DefaultSchemaOptions }
);

// ------------------------------------------
// Schema model exports
export const GameModel: Model<IGame> = model<IGame>(
  'Game', gameSchema, 'Game'
);
