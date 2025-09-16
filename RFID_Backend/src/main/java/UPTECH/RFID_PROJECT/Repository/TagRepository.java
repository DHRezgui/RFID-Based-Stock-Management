package UPTECH.RFID_PROJECT.Repository;

import UPTECH.RFID_PROJECT.Entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long>  {
    List<Tag> findByReaderName(String readerName);
    Optional<Tag> findFirstByEpcAndAntennaPort(String epc, String antennaPort);
}
