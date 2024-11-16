const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class StopWerseService{
    async CreateWord(data){
        try{
            return await prisma.StopWerse.create({ data }); 
        } catch (error){
            return false;
        }
    }

    async GetStopWerses(){
        try{
            const stop_werses = await prisma.StopWerse.findMany({});
            return stop_werses;
        } catch (error){
            return false;
        }
    }

    async UpdateWordById(id, data){
        try{
            return await prisma.StopWerse.update({ where: {word_id: id }, data });
        } catch (error){
            return false;
        }
    }

    async DeleteWord(id){
        return await prisma.StopWerse.delete({ where: { word_id: id } });
    }
}

module.exports = new StopWerseService();