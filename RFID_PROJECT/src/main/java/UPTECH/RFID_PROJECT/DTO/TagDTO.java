package UPTECH.RFID_PROJECT.DTO;


import java.util.Objects;

public class TagDTO {
    private Long id;
    private String epc;
    private String readerName;
    private String readerSerialNumber;
    private String antennaPort;
    private String rssi;
    private String timeOfRead;

    public TagDTO() {
    }

    public TagDTO(Long id, String epc, String readerName, String readerSerialNumber, String antennaPort, String rssi, String timeOfRead) {
        this.id = id;
        this.epc = epc;
        this.readerName = readerName;
        this.readerSerialNumber = readerSerialNumber;
        this.antennaPort = antennaPort;
        this.rssi = rssi;
        this.timeOfRead = timeOfRead;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEpc() {
        return epc;
    }

    public void setEpc(String epc) {
        this.epc = epc;
    }

    public String getReaderName() {
        return readerName;
    }

    public void setReaderName(String readerName) {
        this.readerName = readerName;
    }

    public String getReaderSerialNumber() {
        return readerSerialNumber;
    }

    public void setReaderSerialNumber(String readerSerialNumber) {
        this.readerSerialNumber = readerSerialNumber;
    }

    public String getAntennaPort() {
        return antennaPort;
    }

    public void setAntennaPort(String antennaPort) {
        this.antennaPort = antennaPort;
    }

    public String getRssi() {
        return rssi;
    }

    public void setRssi(String rssi) {
        this.rssi = rssi;
    }

    public String getTimeOfRead() {
        return timeOfRead;
    }

    public void setTimeOfRead(String timeOfRead) {
        this.timeOfRead = timeOfRead;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TagDTO tagDTO = (TagDTO) o;
        return Objects.equals(id, tagDTO.id) && Objects.equals(epc, tagDTO.epc) && Objects.equals(readerName, tagDTO.readerName) && Objects.equals(readerSerialNumber, tagDTO.readerSerialNumber) && Objects.equals(antennaPort, tagDTO.antennaPort) && Objects.equals(rssi, tagDTO.rssi) && Objects.equals(timeOfRead, tagDTO.timeOfRead);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, epc, readerName, readerSerialNumber, antennaPort, rssi, timeOfRead);
    }

    @Override
    public String toString() {
        return "TagDTO{" +
                "id=" + id +
                ", epc='" + epc + '\'' +
                ", readerName='" + readerName + '\'' +
                ", readerSerialNumber='" + readerSerialNumber + '\'' +
                ", antennaPort='" + antennaPort + '\'' +
                ", rssi='" + rssi + '\'' +
                ", timeOfRead='" + timeOfRead + '\'' +
                '}';
    }
}
