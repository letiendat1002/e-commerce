package com.ecommerce.backend.util.runner;

import com.ecommerce.backend.user.User;
import com.ecommerce.backend.user.UserRepository;
import com.ecommerce.backend.user.enums.Gender;
import com.ecommerce.backend.util.security.enums.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class CommandLineAppStartupRunner implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        var email = "admin@linkking.com";
        var password = "admin";
        if (!userRepository.existsByEmail(email)) {
            var admin = new User(
                    email,
                    passwordEncoder.encode(password),
                    "Admin",
                    Gender.MALE,
                    "",
                    "",
                    UserRole.ADMIN,
                    true
            );
            userRepository.save(admin);
        }
    }
}

