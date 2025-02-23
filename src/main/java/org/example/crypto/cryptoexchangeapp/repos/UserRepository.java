package org.example.crypto.cryptoexchangeapp.repos;

import org.example.crypto.cryptoexchangeapp.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
