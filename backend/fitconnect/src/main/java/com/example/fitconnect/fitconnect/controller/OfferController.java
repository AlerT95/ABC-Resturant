package com.example.fitconnect.fitconnect.controller;

import com.example.fitconnect.fitconnect.dto.OfferDTO;
import com.example.fitconnect.fitconnect.service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
public class OfferController {

    @Autowired
    private OfferService offerService;

    @SuppressWarnings("null")
    @PostMapping("")
    public ResponseEntity<OfferDTO> createOffer(@RequestBody OfferDTO offerDTO) {
        try {
            return new ResponseEntity<>(offerService.createOffer(offerDTO), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @SuppressWarnings("null")
    @GetMapping("")
    public ResponseEntity<List<OfferDTO>> getAllOffers() {
        try {
            List<OfferDTO> offers = offerService.getAllOffers();
            if (offers.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(offers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @SuppressWarnings("null")
    @GetMapping("/{id}")
    public ResponseEntity<OfferDTO> getOfferById(@PathVariable("id") String id) {
        try {
            return new ResponseEntity<>(offerService.getOfferById(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @SuppressWarnings("null")
    @PutMapping("/{id}")
    public ResponseEntity<OfferDTO> updateOffer(@PathVariable("id") String id, @RequestBody OfferDTO offerDTO) {
        try {
            return new ResponseEntity<>(offerService.updateOffer(id, offerDTO), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteOffer(@PathVariable("id") String id) {
        try {
            offerService.deleteOffer(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
