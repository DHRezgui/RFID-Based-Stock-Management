package UPTECH.RFID_PROJECT.Service;
import UPTECH.RFID_PROJECT.DTO.TagDTO;
import UPTECH.RFID_PROJECT.DTO.TagsRequest;

import java.util.List;
import java.util.Optional;

public interface TagService {
    List<TagDTO> getAll();
    Optional<TagDTO> getById(Long id);
    List<TagDTO> getByReaderName(String readerName);
    TagDTO getByEpcAndAntennaPort(String epc, String antennaPort);
    TagDTO save(TagDTO tagDTO);
    void saveTags(TagsRequest tagsRequest);
    void deleteById(Long id);
}
