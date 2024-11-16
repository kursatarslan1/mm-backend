const helper = require("../../helpers/helper");
const { exec } = require('child_process');
const path = require("path");
const zemberekFilePath = path.join(__dirname, '..', '..');
const StopWerseService = require('../stop-werse/stopwerse.service');

console.log(zemberekFilePath);

function execPromise(command) {
    return new Promise((resolve, reject) => {
        exec(command, { cwd: path.join(__dirname, '..', '..') }, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${error.message}`);
            }
            resolve(stdout);  
        });
    });
}

class Prep {
    constructor() {}

    async RemovePunctuations(data) {
        const text = data.text;
        try {
            const result = text.replace(helper.punctuations, "");
            return result;
        } catch (error) {
            return false;
        }
    }

    async RemoveNumbers(data) {
        const text = data.text;
        try {
            const result = text.replace(helper.number, "");
            return result.trim();
        } catch (error) {
            return false;
        }
    }

    async LowerCase(data) {
        const text = data.text;
        try {
            const result = text.toLowerCase();
            return result;
        } catch (error) {
            return false;
        }
    }

    async AnalyzeWord(text) {
        try {
            const words = text.split(/\s+/);
            const results = []; 
        
            for (const word of words) {
                const command = `java -Dfile.encoding=UTF-8 -cp "${zemberekFilePath}\\libs\\zemberek-full.jar;." TestZemberek "${word}"`;
                console.log(`Running: ${command}`);
                
                
                const rawResult = await execPromise(command);
    
               
                const processedResult = processAnalysisResult(rawResult); 
                console.log(`Processed Result for "${word}":`, processedResult);
    
                results.push({ word, ...processedResult }); 
            }
        
            return results; 
        } catch (error) {
            console.error('Error analyzing word:', error);
            return null; 
        }
    }

    async StopWords(text) {
        try {
            const response = await StopWerseService.GetStopWerses();
            const stopWords = response.map(wordObj => wordObj.word);

            const words = text.split(/\s+/);
    
            const filteredWords = words.filter(word => !stopWords.includes(word));
    
            return filteredWords.join(' ');
        } catch (error) {
            console.error('Error in StopWerse:', error);
            return false;
        }
    }

    async FindUniques(text) {
        try {
            const words = text.split(/\s+/);
    
            const uniqueWords = [...new Set(words)];
    
            return uniqueWords.join(' ');
        } catch (error) {
            console.error('Error in FindUniques:', error);
            return false;
        }
    }

}

function processAnalysisResult(rawResult) {
    const lines = rawResult.split("\n"); 
    const stems = [];
    const lemmas = [];

    lines.forEach(line => {
        if (line.startsWith("Stem (Kök):")) {
            const stem = line.split(":")[1].trim(); 
            if (!stems.includes(stem)) {
                stems.push(stem); 
            }
        } else if (line.startsWith("Lemmas:")) {
            const lemmaList = line.split(":")[1].trim();
            lemmaList.slice(1, -1).split(",").forEach(lemma => {
                const cleanLemma = lemma.trim();
                if (!lemmas.includes(cleanLemma)) {
                    lemmas.push(cleanLemma); 
                }
            });
        }
    });

    return { stems, lemmas }; 
}

module.exports = new Prep();
