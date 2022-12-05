import { Request, Response, NextFunction, Router } from 'express';
import { IGame, GameModel } from './game.model';
import { ResourceController } from '../../shared';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../shared/utils/logger';

export class GameController extends ResourceController<IGame>{

    private logger: Logger = new Logger();
    constructor() {
        super(GameModel);
    }
    /**
     * Apply all routes for example
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();
        router
            .get('/', this.getGames)
            .get('/:id', this.getGameById)
            .post('/', this.postGame)
            .put('/:id', this.updateGame)
            .delete('/:id', this.deleteGame);

        return router;
    }

    /**
     * Sends a message containing all games back as a response
     * @param req
     * @param res 
     */
    getGames = async (req: Request, res: Response) => {
        this.logger.debug('getGames request');
        const allGames = await this.getAll(req, res);
        return res
            .status(StatusCodes.OK)
            .json(allGames);
    }

    /**
     * Creates a new game
     * @param req
     * @param res
     */

    postGame = async (req: Request, res: Response) => {
        this.logger.debug('postGame request');
        const game = await this.create(req, res);
        return res
            .status(StatusCodes.OK)
            .json(game);
    }

    /**
     * Delete game by id
     * @param req 
     * @param res 
     */
    deleteGame = async (req: Request, res: Response) => {
        this.logger.debug('deleteGame request');
        const game = await this.delete(req.params.id, req, res);
        return res
            .status(StatusCodes.OK)
            .json(game);

    }

    /**
     * Update game by id
     * @param req 
     * @param res 
     */
    updateGame = async (req: Request, res: Response) => {
        this.logger.debug('updateGame request');
        const game = await this.update(req.params.id, req.body.blacklist, req, res);
        return res
            .status(StatusCodes.OK)
            .json(game);
    }

    /**
     * Get single game by id
     * @param req 
     * @param res 
     */
    getGameById = async (req: Request, res: Response) => {
        this.logger.debug('getGameById request');
        const game = await this.getOne(req.params.id, req, res);
        return res
            .status(StatusCodes.OK)
            .json(game);
    }
}
