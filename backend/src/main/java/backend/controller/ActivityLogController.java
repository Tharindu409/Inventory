package backend.controller;

import backend.model.ActivityLog;
import backend.repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ActivityLogController {
    @Autowired
    private LogRepository logRepository;

    //post : save new log entry
    @PostMapping("/log")
    public ActivityLog createLog(@RequestBody ActivityLog log){
        log.setTimestamp(java.time.LocalDateTime.now());
        return logRepository.save(log);
    }
    //get : fetch all
    @GetMapping("/logs")
    public List<ActivityLog> getAllLogs(){
        return logRepository.findAllByOrderByTimestampDesc();
    }

    //clearLogs
    @DeleteMapping("/logs/clear")
    public String clearAllLongs(){
        logRepository.deleteAll();
        return "Audit trail cleared successfully";
    }

}
