package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import server.model.Summary;
import server.repository.SummaryRepository;
import java.time.LocalDateTime;

@Service
public class SummaryService {

    @Autowired
    private SummaryRepository summaryRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    private AIModelService aiModelService;

    public Summary summarizeAndSave(String textInput, MultipartFile file, Integer modelId, Integer userId) throws Exception {
        String originalText = "";
        String filePath = null;

        if (file != null && !file.isEmpty()) {
            originalText = fileService.extractText(file);
            filePath = fileService.uploadFile(file);
        } else if (textInput != null && !textInput.isEmpty()) {
            originalText = textInput;
        } else {
            throw new IllegalArgumentException("Input is empty");
        }

        String summarizedText = aiModelService.requestSummaryText(originalText);

        Summary summary = new Summary();
        summary.setUserId(userId);
        summary.setModelId(modelId);
        summary.setOriginalText(originalText);
        summary.setSummarizedText(summarizedText);
        summary.setFilePath(filePath);
        summary.setLengthInput(originalText.length());
        summary.setLengthOutput(summarizedText.length());
        summary.setCreateAt(LocalDateTime.now());

        return summaryRepository.save(summary);
    }
}