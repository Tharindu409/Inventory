package backend.repository;

import backend.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<ContactMessage, Long> {
    // Basic CRUD (save, findAll, delete) is handled by JpaRepository
}