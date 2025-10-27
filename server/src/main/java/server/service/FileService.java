package server.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileService {

    private final String uploadDir = "./uploads";

    public FileService() {
        try {
            Files.createDirectories(Paths.get(uploadDir));
        } catch (IOException e) {
            throw new RuntimeException("Khong the tao thu muc luu file", e);
        }
    }

    //luu file tra ve path
    public String uploadFile(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String uniqueFilename = UUID.randomUUID().toString() + "_" + originalFilename;
        Path copyLocation = Paths.get(uploadDir + File.separator + uniqueFilename);

        Files.copy(file.getInputStream(), copyLocation, StandardCopyOption.REPLACE_EXISTING);
        return copyLocation.toAbsolutePath().toString();
    }

    //trich noi dung
    public String extractText(MultipartFile file) throws IOException {
        String contentType = file.getContentType();
        if (contentType == null) {
            throw new IOException("Khong xac dinh duoc loai file.");
        }

        try (InputStream inputStream = file.getInputStream()) {

            switch (contentType) {
                case "text/plain":
                    return new String(inputStream.readAllBytes());

                case "application/pdf":
                    try (PDDocument document = PDDocument.load(inputStream)) {
                        PDFTextStripper stripper = new PDFTextStripper();
                        return stripper.getText(document);
                    }

                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": // .docx
                    try (XWPFDocument doc = new XWPFDocument(inputStream);
                         XWPFWordExtractor extractor = new XWPFWordExtractor(doc)) {
                        return extractor.getText();
                    }

                default:
                    throw new IOException("Dinh dang khong ho tro doc: " + contentType);
            }
        }
    }
}
