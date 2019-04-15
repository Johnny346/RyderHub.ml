import java.io.File;
import java.io.IOException;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

public class ExtractPdf {
    String[] textArray;
    String fileName = "";

    public ExtractPdf(String fileName){
        this.fileName = fileName;
    }
    public String[]  extract() throws IOException{
        PDDocument document = null;
        String fn = this.fileName;
        try
        {
            document = PDDocument.load( new File(fn));
            PDFTextStripper stripper = new PDFTextStripper();
            String pdfText = stripper.getText(document).toString();

            textArray = pdfText.split("\\s");
        }
        finally
        {
            if( document != null )
            {
                document.close();
            }
        }
        return textArray ;

    }
}
