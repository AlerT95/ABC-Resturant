package com.example.fitconnect.fitconnect.service;

import com.example.fitconnect.fitconnect.dto.OfferDTO;
import com.example.fitconnect.fitconnect.model.Offer;
import com.example.fitconnect.fitconnect.model.Product;
import com.example.fitconnect.fitconnect.repository.OfferRepository;
import com.example.fitconnect.fitconnect.repository.ProductRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OfferService {

    @Autowired
    private OfferRepository offerRepository;
    @Autowired
    private ProductRepository productRepository;

    public OfferDTO createOffer(OfferDTO offerDTO) {
        Optional<Product> productOptional = productRepository.findById(offerDTO.getProductId()); 

        if (productOptional.isPresent()) {
            Offer offer = new Offer(
                    offerDTO.getOfferName(),
                    offerDTO.getDescription(),
                    offerDTO.getDiscountPercentage(),
                    offerDTO.getStartDate(),
                    offerDTO.getEndDate(),
                    productOptional.get()
            );
            Offer savedOffer = offerRepository.save(offer);
            return convertToDTO(savedOffer);
        } else {
            throw new RuntimeException("Product not found");
        }
    }

    public List<OfferDTO> getAllOffers() {
        return offerRepository.findAll().stream().map(this::convertToDTO).toList();
    }

    public OfferDTO getOfferById(String id) {
        Optional<Offer> offerOptional = offerRepository.findById(new ObjectId(id));
        return offerOptional.map(this::convertToDTO).orElseThrow(() -> new RuntimeException("Offer not found"));
    }

    public OfferDTO updateOffer(String id, OfferDTO offerDTO) {
        Optional<Offer> existingOfferOptional = offerRepository.findById(new ObjectId(id));
        Optional<Product> productOptional = productRepository.findById(offerDTO.getProductId());

        if (existingOfferOptional.isPresent() && productOptional.isPresent()) {
            Offer existingOffer = existingOfferOptional.get();
            existingOffer.setOfferName(offerDTO.getOfferName());
            existingOffer.setDescription(offerDTO.getDescription());
            existingOffer.setDiscountPercentage(offerDTO.getDiscountPercentage());
            existingOffer.setStartDate(offerDTO.getStartDate());
            existingOffer.setEndDate(offerDTO.getEndDate());
            existingOffer.setProduct(productOptional.get());
            Offer updatedOffer = offerRepository.save(existingOffer);
            return convertToDTO(updatedOffer);
        } else {
            throw new RuntimeException("Offer or Product not found");
        }
    }


    public void deleteOffer(String id) {
        offerRepository.deleteById(new ObjectId(id));
    }

    // Helper method to convert Offer to OfferDTO
    private OfferDTO convertToDTO(Offer offer) {
        OfferDTO offerDTO = new OfferDTO();
        offerDTO.setId(offer.getId());
        offerDTO.setOfferName(offer.getOfferName());
        offerDTO.setDescription(offer.getDescription());
        offerDTO.setDiscountPercentage(offer.getDiscountPercentage());
        offerDTO.setStartDate(offer.getStartDate());
        offerDTO.setEndDate(offer.getEndDate());
        offerDTO.setProductId(offer.getProduct().getId()); // Changed here

        return offerDTO;
    }
}