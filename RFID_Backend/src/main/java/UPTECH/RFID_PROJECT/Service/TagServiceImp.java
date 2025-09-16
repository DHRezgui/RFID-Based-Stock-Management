package UPTECH.RFID_PROJECT.Service;
import UPTECH.RFID_PROJECT.DTO.TagDTO;
import UPTECH.RFID_PROJECT.DTO.TagsRequest;
import UPTECH.RFID_PROJECT.Entity.Tag;
import UPTECH.RFID_PROJECT.Repository.TagRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TagServiceImp implements TagService {

    private final TagRepository tagRepository;

    public TagServiceImp(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Override
    public List<TagDTO> getAll() {
        return tagRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public Optional<TagDTO> getById(Long id) {
        return tagRepository.findById(id).map(this::mapToDTO);
    }

    @Override
    public TagDTO getByEpcAndAntennaPort(String epc, String antennaPort) {
        Optional<Tag> tag = tagRepository.findFirstByEpcAndAntennaPort(epc, antennaPort);
        if (tag.isEmpty()) {
            throw new RuntimeException("Tag not found with EPC: " + epc + " and AntennaPort: " + antennaPort);
        }
        return mapToDTO(tag.get());
    }

    @Override
    public List<TagDTO> getByReaderName(String readerName) {
        return tagRepository.findByReaderName(readerName).stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public TagDTO save(TagDTO tagDTO) {
        Tag tag = mapToEntity(tagDTO);
        Tag savedTag = tagRepository.save(tag);
        return mapToDTO(savedTag);
    }

    @Override
    public void saveTags(TagsRequest tagsRequest) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss.SSS");
        try {
            for (TagDTO tagDto : tagsRequest.getTags()) {
                if (tagDto.getEpc() == null || tagDto.getEpc().isEmpty()) {
                    throw new IllegalArgumentException("EPC cannot be null or empty");
                }
                if (tagDto.getAntennaPort() == null || tagDto.getAntennaPort().isEmpty()) {
                    throw new IllegalArgumentException("AntennaPort cannot be null or empty");
                }
                if (tagDto.getTimeOfRead() == null || tagDto.getTimeOfRead().isEmpty()) {
                    throw new IllegalArgumentException("TimeOfRead cannot be null or empty");
                }

                String epc = tagDto.getEpc();
                String antennaPort = tagDto.getAntennaPort();
                Optional<Tag> existingTagOpt = tagRepository.findFirstByEpcAndAntennaPort(epc, antennaPort);
                if (existingTagOpt.isEmpty()) {
                    Tag tag = new Tag();
                    tag.setReaderName(tagsRequest.getReaderName() != null ? tagsRequest.getReaderName() : tagDto.getReaderName());
                    tag.setReaderSerialNumber(tagsRequest.getReaderSerialNumber() != null ? tagsRequest.getReaderSerialNumber() : tagDto.getReaderSerialNumber());
                    tag.setAntennaPort(tagDto.getAntennaPort());
                    tag.setEpc(tagDto.getEpc());
                    tag.setRssi(tagDto.getRssi());
                    tag.setTimeOfRead(tagDto.getTimeOfRead());
                    tagRepository.save(tag);
                } else {
                    Tag existingTag = existingTagOpt.get();
                    existingTag.setTimeOfRead(LocalDateTime.parse(tagDto.getTimeOfRead(), formatter).toString());
                    existingTag.setRssi(tagDto.getRssi()); // Mise à jour du RSSI si nécessaire
                    tagRepository.save(existingTag);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to save tags: " + e.getMessage());
        }
    }

    @Override
    public void deleteById(Long id) {
        tagRepository.deleteById(id);
    }

    private TagDTO mapToDTO(Tag tag) {
        return new TagDTO(
                tag.getId(),
                tag.getEpc(),
                tag.getReaderName(),
                tag.getReaderSerialNumber(),
                tag.getAntennaPort(),
                tag.getRssi(),
                tag.getTimeOfRead()
        );
    }

    private Tag mapToEntity(TagDTO dto) {
        Tag tag = new Tag();
        tag.setId(dto.getId());
        tag.setEpc(dto.getEpc());
        tag.setReaderName(dto.getReaderName());
        tag.setReaderSerialNumber(dto.getReaderSerialNumber());
        tag.setAntennaPort(dto.getAntennaPort());
        tag.setRssi(dto.getRssi());
        tag.setTimeOfRead(dto.getTimeOfRead());
        return tag;
    }
}