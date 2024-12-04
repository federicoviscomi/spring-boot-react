package com.secure.notes.controllers;

import com.secure.notes.dtos.UserDTO;
import com.secure.notes.models.Role;
import com.secure.notes.models.User;
import com.secure.notes.repositories.RoleRepository;
import com.secure.notes.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminController {

    @Autowired
    UserService userService;

    @Autowired
    RoleRepository roleRepository;

    @GetMapping("/api/admin/users")
    public ResponseEntity<List<User>> getAllUsers() {
        log.info("GET /api/admin/users +");
        List<User> users = userService.getAllUsers();
        ResponseEntity<List<User>> response = new ResponseEntity<>(users, HttpStatus.OK);
        log.info("users size {} -", users.size());
        return response;
    }

    @PutMapping("/api/admin/update-role")
    public ResponseEntity<String> updateUserRole(
            @RequestParam Long userId,
            @RequestParam String roleName
    ) {
        userService.updateUserRole(userId, roleName);
        return ResponseEntity.ok("User role updated");
    }

    @GetMapping("/api/admin/user/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @GetMapping("/api/admin/delete-user/{id}")
    public ResponseEntity<UserDTO> deleteUser(@PathVariable Long id) {
        // TODO use a delete mapping!
        userService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/api/admin/update-lock-status")
    public ResponseEntity<String> updateAccountLockStatus(@RequestParam Long userId, @RequestParam boolean lock) {
        userService.updateAccountLockStatus(userId, lock);
        return ResponseEntity.ok("Account lock status updated");
    }

    @GetMapping("/api/admin/roles")
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @PutMapping("/api/admin/update-expiry-status")
    public ResponseEntity<String> updateAccountExpiryStatus(@RequestParam Long userId, @RequestParam boolean expire) {
        userService.updateAccountExpiryStatus(userId, expire);
        return ResponseEntity.ok("Account expiry status updated");
    }

    @PutMapping("/api/admin/update-enabled-status")
    public ResponseEntity<String> updateAccountEnabledStatus(@RequestParam Long userId, @RequestParam boolean enabled) {
        userService.updateAccountEnabledStatus(userId, enabled);
        return ResponseEntity.ok("Account enabled status updated");
    }

    @PutMapping("/api/admin/update-credentials-expiry-status")
    public ResponseEntity<String> updateCredentialsExpiryStatus(@RequestParam Long userId, @RequestParam boolean expire) {
        userService.updateCredentialsExpiryStatus(userId, expire);
        return ResponseEntity.ok("Credentials expiry status updated");
    }

    @PutMapping("/api/admin/update-password")
    public ResponseEntity<String> updatePassword(@RequestParam Long userId, @RequestParam String password) {
        try {
            userService.updatePassword(userId, password);
            return ResponseEntity.ok("Password updated");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


}

