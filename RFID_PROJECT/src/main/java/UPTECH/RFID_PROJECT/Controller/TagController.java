package UPTECH.RFID_PROJECT.Controller;

import UPTECH.RFID_PROJECT.DTO.TagDTO;
import UPTECH.RFID_PROJECT.DTO.TagsRequest;
import UPTECH.RFID_PROJECT.Entity.Tag;
import UPTECH.RFID_PROJECT.Exception.ResourceNotFoundException;
import UPTECH.RFID_PROJECT.Repository.ProductRepository;
import UPTECH.RFID_PROJECT.Repository.TagRepository;
import UPTECH.RFID_PROJECT.Service.TagService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tag")
public class TagController {

    private final TagService tagService;
    private final TagRepository tagRepository;
    private final ProductRepository productRepository;

    public TagController(TagService tagService, TagRepository tagRepository, ProductRepository productRepository) {
        this.tagService = tagService;
        this.tagRepository = tagRepository;
        this.productRepository = productRepository;
    }

    @GetMapping("/dto")
    public List<TagDTO> getAllTagDTOs() {
        return tagService.getAll();
    }

    @GetMapping("/dto/{id}")
    public TagDTO getById(@PathVariable Long id) {
        return tagService.getById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tag not found with id " + id));
    }

    @GetMapping("/dto/by-reader")
    public List<TagDTO> getByReaderName(@RequestParam String readerName) {
        return tagService.getByReaderName(readerName);
    }

    @PostMapping("/dto")
    public TagDTO saveTag(@RequestBody TagDTO tagDTO) {
        return tagService.save(tagDTO);
    }

    @PostMapping("/dto/batch") // Added for saveTags
    public ResponseEntity<String> saveTags(@RequestBody TagsRequest tagsRequest) {
        tagService.saveTags(tagsRequest);
        return ResponseEntity.ok("Tags saved successfully");
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        tagService.deleteById(id);
    }

    @GetMapping("/available")
    public ResponseEntity<List<Tag>> getAvailableTags() {
        List<Tag> allTags = tagRepository.findAll();

        List<Long> usedTagIds = productRepository.findAll()
                .stream()
                .filter(p -> p.getTag() != null && p.getTag().getId() != null) // Null checks
                .map(p -> p.getTag().getId())
                .toList();

        List<Tag> availableTags = allTags.stream()
                .filter(tag -> tag.getId() != null && !usedTagIds.contains(tag.getId()))
                .toList();

        return ResponseEntity.ok(availableTags);
    }
    @GetMapping("/dto/by-epc-antenna")
    public ResponseEntity<TagDTO> getByEpcAndAntennaPort(@RequestParam String epc, @RequestParam String antennaPort) {
        if (epc == null || epc.isEmpty() || antennaPort == null || antennaPort.isEmpty()) {
            throw new IllegalArgumentException("EPC and AntennaPort cannot be null or empty");
        }
        return ResponseEntity.ok(tagService.getByEpcAndAntennaPort(epc, antennaPort));
    }
}