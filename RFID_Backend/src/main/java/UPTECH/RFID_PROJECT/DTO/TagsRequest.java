package UPTECH.RFID_PROJECT.DTO;

import java.util.ArrayList;
import java.util.List;
import lombok.*;

@Getter
@Setter
public class TagsRequest {
    private String readerName;
    private String readerSerialNumber;
    private String epc;
    private String antennaPort;
    private String rssi;
    private List<TagDTO> tags = new ArrayList<>();
    private String timeOfRead;




}

