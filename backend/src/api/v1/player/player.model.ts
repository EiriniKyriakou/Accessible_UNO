import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface IPlayer extends Document {
  username: string;
  password: string;
  avatar: string;
  wins: number;
  games: number;
  dysrhythmia: boolean;
  dyslexia: boolean;
  impairedVision: boolean;
}

// ------------------------------------------
// Schema definition
const playerSchema = new Schema(
  {
    username: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String, required: true},
    wins: {type: Number, required: true},
    games: {type: Number, required: true},
    dysrhythmia: {type: Boolean, required: true},
    dyslexia: {type: Boolean, required: true},
    impairedVision: {type: Boolean, required: true}
  },
  { ...DefaultSchemaOptions }
);

// ------------------------------------------
// Schema model exports
export const PlayerModel: Model<IPlayer> = model<IPlayer>(
  'Player', playerSchema, 'Player'
);
