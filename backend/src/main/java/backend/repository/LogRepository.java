package backend.repository;

import backend.model.ActivityLog;
import org.apache.juli.logging.Log;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LogRepository  extends JpaRepository<ActivityLog, Long> {
    List<ActivityLog>findAllByOrderByTimestampDesc();
}
