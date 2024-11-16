const Prep = require("./preprocessing.service");

async function RemovePunctuations(req, res) {
    try {
        const resultText = await Prep.RemovePunctuations(req.body);
        if (!resultText) {
            res.status(400).json({ message: "Cannot remove punctuations" });
        }
        res.status(200).json({ text: resultText });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}

async function RemoveNumbers(req, res) {
    try {
        const resultText = await Prep.RemoveNumbers(req.body);
        if (!resultText) {
            res.status(400).json({ message: "Cannot remove numbers" });
        }
        res.status(200).json({ text: resultText });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}

async function TextToLowerCase(req, res) {
    try {
        const resultText = await Prep.LowerCase(req.body);
        if (!resultText) {
            res.status(400).json({ message: "Cannot change to lowercase" });
        }
        res.status(200).json({ text: resultText });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}

async function AnalyzeWord(req, res) {
    try {
      const text = req.body.text;
      const analysisResult = await Prep.AnalyzeWord(text);
  
      if (!analysisResult) {
        return res.status(400).json({ message: 'Error analyzing word' });
      }
  
      res.status(200).json(analysisResult);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server Error' });
    }
}

async function StopWords(req, res){
    try{
        const result = await Prep.StopWords(req.body.text);

        if(!result){
            return res.status(400).json({ error: "Stop words couldn't remove." });
        }
        return res.status(200).json({ result });
    } catch (error) {
        return res.status(500).json({ error : "Server Error" });
    }
}

async function FindUniques(req, res){
    try{
        const result = await Prep.FindUniques(req.body.text);
        if(!result){
            return res.status(400).json({ error: "Cannot find uniques." });
        }
        return res.status(200).json({ result });
    } catch (error){
        return res.status(500).json({ error: "Server Error" });
    }
}

module.exports = { 
    RemovePunctuations, 
    RemoveNumbers, 
    TextToLowerCase,
    AnalyzeWord,
    StopWords,
    FindUniques
};
