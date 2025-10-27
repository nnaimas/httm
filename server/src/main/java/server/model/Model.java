package server.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "tblmodel")
public class Model {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "modelid")
    private Integer modelId;

    @Column(name = "modelname", length = 100)
    private String modelName;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "version", length = 20)
    private String version;

    @Column(name = "createat")
    private LocalDate createAt;
}
