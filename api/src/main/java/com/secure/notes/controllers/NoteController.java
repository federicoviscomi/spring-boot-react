package com.secure.notes.controllers;

import com.secure.notes.models.Note;
import com.secure.notes.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class NoteController {

    @Autowired
    private NoteService noteService;

    @PostMapping("/api/notes")
    public Note createNote(@RequestBody String content,
                           @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        System.out.println("USER DETAILS: " + username);
        return noteService.createNoteForUser(username, content);
    }

    @GetMapping("/api/notes")
    public List<Note> getUserNotes(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        System.out.println("USER DETAILS: " + username);
        List<Note> notes = noteService.getNotesForUser(username);
        System.out.println("notes: " + notes);
        return notes;
    }

    @PutMapping("/api/notes/{noteId}")
    public Note updateNote(@PathVariable Long noteId,
                           @RequestBody String content,
                           @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        return noteService.updateNoteForUser(noteId, content, username);
    }

    @DeleteMapping("/api/notes/{noteId}")
    public void deleteNote(
            @PathVariable Long noteId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        String username = userDetails.getUsername();
        noteService.deleteNoteForUser(noteId, username);
    }
}
