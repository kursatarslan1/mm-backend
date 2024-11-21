const helper = require("../../helpers/helper");
const { exec } = require("child_process");
const path = require("path");
const zemberekFilePath = path.join(__dirname, "..", "..");
const StopWerseService = require("../stop-werse/stopwerse.service");

console.log(zemberekFilePath);

function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(
      command,
      { cwd: path.join(__dirname, "..", "..") },
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${error.message}`);
        }
        resolve(stdout);
      }
    );
  });
}

class Prep {
  constructor() {}

  async RemovePunctuations(text) {
    try {
      const result = text.replace(helper.punctuations, "");
      return result;
    } catch (error) {
      return false;
    }
  }

  async RemoveNumbers(text) {
    try {
      const result = text.replace(helper.number, "");
      const removeAllNumbers = result.replace(helper.numbers, "");
      return removeAllNumbers.trim();
    } catch (error) {
      return false;
    }
  }

  async LowerCase(text) {
    try {
      const result = text.toLowerCase();
      return result;
    } catch (error) {
      return false;
    }
  }

  async AnalyzeWord(text) {
    try {
      // Zemberek'e doğrudan metni gönder
      const command = `java -Xms512m -Xmx2g -Dfile.encoding=UTF-8 -cp "${zemberekFilePath}/libs/zemberek-full.jar:." TestZemberek "${text}"`;

      // Zemberek analizi gerçekleştirin
      const rawResult = await execPromise(command);

      // Çıkan sonuçları işleyin
      const processedResult = processAnalysisResult(rawResult);

      // Sonuçları döndürün
      return processedResult.lemmas.join(" ");
    } catch (error) {
      console.error("Error analyzing text:", error);
      return null;
    }
  }

  async StopWords(text) {
    try {
      const response = await StopWerseService.GetStopWerses();
      const stopWords = response.map((wordObj) => wordObj.word);

      const words = text.split(/\s+/);

      const filteredWords = words.filter((word) => !stopWords.includes(word));

      return filteredWords.join(" ");
    } catch (error) {
      console.error("Error in StopWerse:", error);
      return false;
    }
  }

  async FindUniques(text) {
    try {
      const words = text.split(/\s+/);

      const uniqueWords = [...new Set(words)];

      return uniqueWords.join(" ");
    } catch (error) {
      console.error("Error in FindUniques:", error);
      return false;
    }
  }

  async FullAuto(text) {
    try {
      const results = {};

      results.removePunctuationResult = await this.RemovePunctuations(text);
      results.removeNumberResult = await this.RemoveNumbers(
        results.removePunctuationResult
      );
      results.lowerCaseResult = await this.LowerCase(
        results.removeNumberResult
      );
      results.zemberekResult = await this.AnalyzeWord(results.lowerCaseResult);
      results.stopWordsResult = await this.StopWords(results.zemberekResult);
      results.findUniquesResult = await this.FindUniques(
        results.stopWordsResult
      );

      return results;
    } catch (error) {
      console.error("Error in FullAuto:", error);
      return false;
    }
  }
}

function processAnalysisResult(rawResult) {
  const lines = rawResult.split("\n");
  const stems = [];
  const lemmas = [];

  lines.forEach((line) => {
    if (line.startsWith("Stem (Kök):")) {
      const stem = line.split(":")[1].trim();
      if (!stems.includes(stem)) {
        stems.push(stem);
      }
    } else if (line.startsWith("Lemmas:")) {
      const lemmaList = line.split(":")[1].trim();
      lemmaList
        .slice(1, -1)
        .split(",")
        .forEach((lemma) => {
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
