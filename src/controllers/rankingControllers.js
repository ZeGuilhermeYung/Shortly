import { rankRepository } from "../repositories/rankingRepository"; 

async function rankingUsers(req, res) {
    try {
        const ranks = (await rankRepository.getRanks()).rows;

        res.send(ranks);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { rankingUsers };