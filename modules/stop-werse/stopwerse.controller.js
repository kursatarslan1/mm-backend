const StopWerseService = require('./stopwerse.service');

async function CreateWord(req, res){
    try{
        const word = await StopWerseService.CreateWord(req.body);
        if(!word){
            return res.status(400).json({ error: "Cannot created." });
        }
        return res.status(200).json({ word });
    } catch (error){
        return res.status(500).json({ error: "Server Error" });
    }
}

async function GetStopWerses(req, res){
    try{
        const words = await StopWerseService.GetStopWerses();
        if(!words){
            return res.status(400).json({ error: "Cannot get." });
        }
        return res.status(200).json({ words });
    } catch (error){
        return res.status(500).json({ error : "Server Error" });
    }
}

async function UpdateWordById(req, res){
    try{
        const word = await StopWerseService.UpdateWordById(req.params.id, req.body);
        if(!word){
            return res.status(400).json({ error: "Couldn't update." });
        }
        return res.status(200).json({ word });
    } catch (error){
        return res.status(500).json({ error: "Server Error" });
    }
}

async function DeleteWord(req, res){
    try{
        const word = await StopWerseService.DeleteWord(req.params.id);
        if(!word){
            return res.status(400).json({ error: "Word not found" });
        } 
        return res.status(200).json({ message: "Delete success" });
    } catch (error){
        return res.status(500).json({ error: "Server Error" });
    }
}

module.exports = {
    CreateWord,
    GetStopWerses,
    UpdateWordById,
    DeleteWord
}