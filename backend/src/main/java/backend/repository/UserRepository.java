package backend.repository;

import backend.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserModel, Long> {

    Optional<UserModel> findByEmail(String email);

    // ADD THIS: To find the user when they provide the reset token
    Optional<UserModel> findByResetToken(String resetToken);
}