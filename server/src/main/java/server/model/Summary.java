package server.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tblsummary")
public class Summary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "summaryid")
    private Integer summaryId;

    @Column(name = "userid")
    private Integer userId;

    @Column(name = "modelid")
    private Integer modelId;

    @Column(name = "originaltext", columnDefinition = "TEXT")
    private String originalText;

    @Column(name = "summarizedtext", columnDefinition = "TEXT")
    private String summarizedText;

    @Column(name = "category")
    private String category;

    @Column(name = "filepath")
    private String filePath;

    @Column(name = "lengthinput")
    private int lengthInput;

    @Column(name = "lengthoutput")
    private int lengthOutput;

    @Column(name = "createat")
    private LocalDateTime createAt;

    public Summary() {}

    public Integer getSummaryId() {
        return summaryId;
    }

    public void setSummaryId(Integer summaryId) {
        this.summaryId = summaryId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getModelId() {
        return modelId;
    }

    public void setModelId(Integer modelId) {
        this.modelId = modelId;
    }

    public String getOriginalText() {
        return originalText;
    }

    public void setOriginalText(String originalText) {
        this.originalText = originalText;
    }

    public String getSummarizedText() {
        return summarizedText;
    }

    public void setSummarizedText(String summarizedText) {
        this.summarizedText = summarizedText;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public int getLengthInput() {
        return lengthInput;
    }

    public void setLengthInput(int lengthInput) {
        this.lengthInput = lengthInput;
    }

    public int getLengthOutput() {
        return lengthOutput;
    }

    public void setLengthOutput(int lengthOutput) {
        this.lengthOutput = lengthOutput;
    }

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }
}