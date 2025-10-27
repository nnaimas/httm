package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import server.model.Summary;
import server.service.SummaryService;

@RestController
@RequestMapping("/api/summary")
@CrossOrigin(origins = {"http://localhost:5173"})
public class SummaryController {

    @Autowired
    private SummaryService summaryService;

    @PostMapping("/summarize")
    public ResponseEntity<Summary> summarize(
            @RequestParam(value = "textInput", required = false) String textInput,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam("modelId") String modelIdStr,
            @RequestParam("userId") String userIdStr) {

        if ((textInput == null || textInput.isEmpty()) && (file == null || file.isEmpty())) {
            return ResponseEntity.badRequest().body(null);
        }

        try {
            Integer modelId = Integer.parseInt(modelIdStr);
            Integer userId = Integer.parseInt(userIdStr);

            Summary result = summaryService.summarizeAndSave(textInput, file, modelId, userId);
            return ResponseEntity.ok(result);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(null);
        }
    }
}