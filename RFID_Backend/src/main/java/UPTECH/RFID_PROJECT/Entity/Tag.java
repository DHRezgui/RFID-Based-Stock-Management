package UPTECH.RFID_PROJECT.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String readerName;
    private String readerSerialNumber;
    private String epc;
    private String antennaPort;
    private String rssi;
    @Column(length = 5000)
    private String timeOfRead;

    public Tag() {
    }

    public Tag(Long id, String readerName, String readerSerialNumber, String epc, String antennaPort, String rssi, String timeOfRead) {
        this.id = id;
        this.readerName = readerName;
        this.readerSerialNumber = readerSerialNumber;
        this.epc = epc;
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

    public String getEpc() {
        return epc;
    }

    public void setEpc(String epc) {
        this.epc = epc;
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
        Tag tag = (Tag) o;
        return Objects.equals(id, tag.id) && Objects.equals(readerName, tag.readerName) && Objects.equals(readerSerialNumber, tag.readerSerialNumber) && Objects.equals(epc, tag.epc) && Objects.equals(antennaPort, tag.antennaPort) && Objects.equals(rssi, tag.rssi) && Objects.equals(timeOfRead, tag.timeOfRead);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, readerName, readerSerialNumber, epc, antennaPort, rssi, timeOfRead);
    }

    @Override
    public String toString() {
        return "Tag{" +
                "id=" + id +
                ", readerName='" + readerName + '\'' +
                ", readerSerialNumber='" + readerSerialNumber + '\'' +
                ", epc='" + epc + '\'' +
                ", antennaPort='" + antennaPort + '\'' +
                ", rssi='" + rssi + '\'' +
                ", timeOfRead='" + timeOfRead + '\'' +
                '}';
    }
}
