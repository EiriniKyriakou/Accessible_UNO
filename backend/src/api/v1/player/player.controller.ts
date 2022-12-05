import { Request, Response, NextFunction, Router } from 'express';
import { IPlayer, PlayerModel } from './player.model';
import { ResourceController } from '../../shared';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../shared/utils/logger';

export class PlayerController extends ResourceController<IPlayer>{

    private logger: Logger = new Logger();
    constructor() {
        super(PlayerModel);
    }
    /**
     * Apply all routes for example
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();
        router
            .get('/', this.getPlayers)
            .get('/:id', this.getPlayerById)
            .get('/:username', this.getPlayerByUsername)
            .post('/', this.postPlayer)
            .put('/:id', this.updatePlayer)
            .delete('/:id', this.deletePlayer);

        return router;
    }

    /**
     * Sends a message containing all tasks back as a response
     * @param req
     * @param res 
     */
    getPlayers = async (req: Request, res: Response) => {
        this.logger.debug('getPlayers request');
        const allPlayers = await this.getAll(req, res);
        return res
            .status(StatusCodes.OK)
            .json(allPlayers);
    }

    /**
     * Creates a new task
     * @param req
     * @param res
     */

    postPlayer = async (req: Request, res: Response) => {
        this.logger.debug('postPlayer request');
        const player = await this.create(req, res);
        console.log(player)
        return res
            .status(StatusCodes.OK)
            .json(player);
    }

    /**
     * Delete task by id
     * @param req 
     * @param res 
     */
    deletePlayer = async (req: Request, res: Response) => {
        this.logger.debug('deletePlayer request');
        const player = await this.delete(req.params.id, req, res);
        return res
            .status(StatusCodes.OK)
            .json(player);

    }

    /**
     * Update task by id
     * @param req 
     * @param res 
     */
    updatePlayer = async (req: Request, res: Response) => {
        this.logger.debug('updatePlayer request');
        const player = await this.update(req.params.id, req.body.blacklist, req, res);
        return res
            .status(StatusCodes.OK)
            .json(player);
    }

    /**
     * Get single task by id
     * @param req 
     * @param res 
     */
    getPlayerById = async (req: Request, res: Response) => {
        this.logger.debug('getPlayerById request');
        const player = await this.getOne(req.params.id, req, res);
        return res
            .status(StatusCodes.OK)
            .json(player);
    }

    /**
     * Get single player by username
     * @param req 
     * @param res 
     */
    getPlayerByUsername = async (req: Request, res: Response) => {
        this.logger.debug('getPlayerByUsername request');
        const player = await this.getOne(req.params.username, req, res);
        return res
            .status(StatusCodes.OK)
            .json(player);
    }
}
