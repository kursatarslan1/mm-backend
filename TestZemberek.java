

import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.util.regex.Pattern;

import zemberek.morphology.TurkishMorphology;
import zemberek.morphology.analysis.SingleAnalysis;

public class TestZemberek {
    public static void main(String[] args) {
        System.setOut(new PrintStream(System.out, true, StandardCharsets.UTF_8));
        String text = args[0];  
        TurkishMorphology morphology = TurkishMorphology.createWithDefaults();
        String[] words = Pattern.compile("\\s+").split(text);

        // Analiz sonuçlarını al
        var analysisResult = morphology.analyze(text);

        // Sonuçları yazdır
        for (SingleAnalysis analysis : analysisResult) {
            System.out.println("Stem (Kök): " + analysis.getStem());  // Kök kelimeyi al
            System.out.println("Lemmas: " + analysis.getLemmas());  // Lemma bilgisi
        }
    }
}
