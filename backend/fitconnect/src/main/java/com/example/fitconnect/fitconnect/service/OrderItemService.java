package com.example.fitconnect.fitconnect.service;

import com.example.fitconnect.fitconnect.dto.OrderItemDTO;
import com.example.fitconnect.fitconnect.model.Order;
import com.example.fitconnect.fitconnect.model.OrderItem;
import com.example.fitconnect.fitconnect.model.Product;
import com.example.fitconnect.fitconnect.model.Services;
import com.example.fitconnect.fitconnect.model.Offer;
import com.example.fitconnect.fitconnect.repository.OrderItemRepository;
import com.example.fitconnect.fitconnect.repository.OrderRepository;
import com.example.fitconnect.fitconnect.repository.ProductRepository;
import com.example.fitconnect.fitconnect.repository.ServiceRepository;
import com.example.fitconnect.fitconnect.repository.OfferRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private OfferRepository offerRepository;

    public OrderItemDTO createOrderItem(OrderItemDTO orderItemDTO) {
        Optional<Order> orderOptional = orderRepository.findById(new ObjectId(orderItemDTO.getOrderId()));
        Optional<Product> productOptional = orderItemDTO.getProductId() != null ? productRepository.findById(new ObjectId(orderItemDTO.getProductId())) : Optional.empty();
        Optional<Services> servicesOptional = orderItemDTO.getServiceId() != null ? serviceRepository.findById(new ObjectId(orderItemDTO.getServiceId())) : Optional.empty();
        Optional<Offer> offerOptional = orderItemDTO.getOfferId() != null ? offerRepository.findById(new ObjectId(orderItemDTO.getOfferId())) : Optional.empty();
    
        if (orderOptional.isPresent() && (productOptional.isPresent() || servicesOptional.isPresent() || offerOptional.isPresent())) {
            OrderItem orderItem = new OrderItem(
                    orderItemDTO.getQuantity(),
                    orderItemDTO.getUnitPrice(),
                    orderItemDTO.getTotalAmount(),
                    orderOptional.get(),
                    productOptional.orElse(null),
                    servicesOptional.orElse(null),
                    offerOptional.orElse(null)
            );
            OrderItem savedOrderItem = orderItemRepository.save(orderItem);
            return convertToDTO(savedOrderItem);
        } else {
            throw new RuntimeException("Order not found");
        }
    }

    
    public List<OrderItemDTO> getAllOrderItems() {
        return orderItemRepository.findAll().stream().map(this::convertToDTO).toList();
    }

    public OrderItemDTO getOrderItemById(String id) {
        Optional<OrderItem> orderItemOptional = orderItemRepository.findById(new ObjectId(id));
        return orderItemOptional.map(this::convertToDTO).orElseThrow(() -> new RuntimeException("Order Item not found"));
    }

    public void deleteOrderItem(String id) {
        orderItemRepository.deleteById(new ObjectId(id));
    }

    public void deleteOrderItemsByOrderId(String orderId) {
        Optional<Order> orderOptional = orderRepository.findById(new ObjectId(orderId));
        if (orderOptional.isPresent()) {
            orderItemRepository.deleteByOrder(orderOptional.get());
        } else {
            throw new RuntimeException("Order not found");
        }
    }

    public List<OrderItemDTO> getOrderItemsByOrderId(String orderId) {
        Optional<Order> orderOptional = orderRepository.findById(new ObjectId(orderId));
        if (orderOptional.isPresent()) {
            List<OrderItem> orderItems = orderItemRepository.findByOrder(orderOptional.get());
            return orderItems.stream().map(this::convertToDTO).toList();
        } else {
            throw new RuntimeException("Order not found");
        }
    }

    // Helper method to convert OrderItem to OrderItemDTO
    private OrderItemDTO convertToDTO(OrderItem orderItem) {
        OrderItemDTO orderItemDTO = new OrderItemDTO();
        orderItemDTO.setId(orderItem.getId());
        orderItemDTO.setQuantity(orderItem.getQuantity());
        orderItemDTO.setUnitPrice(orderItem.getUnitPrice());
        orderItemDTO.setTotalAmount(orderItem.getTotalAmount());

        if (orderItem.getOrder() != null) {
            orderItemDTO.setOrderId(orderItem.getOrder().getId().toString());
        }

        if (orderItem.getProduct() != null) {
            orderItemDTO.setProductId(orderItem.getProduct().getId().toString());
        }

        if (orderItem.getService() != null) {
            orderItemDTO.setServiceId(orderItem.getService().getId().toString());
        }

        if (orderItem.getOffer() != null) {
            orderItemDTO.setOfferId(orderItem.getOffer().getId().toString());
        }

        return orderItemDTO;
    }
}