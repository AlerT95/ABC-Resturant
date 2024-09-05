package com.example.fitconnect.fitconnect.service;

import com.example.fitconnect.fitconnect.dto.OrderDTO;
import com.example.fitconnect.fitconnect.model.Order;
import com.example.fitconnect.fitconnect.model.User;
import com.example.fitconnect.fitconnect.repository.OrderRepository;
import com.example.fitconnect.fitconnect.repository.UserRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    public OrderDTO createOrder(OrderDTO orderDTO) {
        Optional<User> userOptional = userRepository.findById(orderDTO.getUserId());
        if (userOptional.isPresent()) {
            Order order = new Order(
                    orderDTO.getTotalAmount(),
                    orderDTO.getSubTotal(),
                    orderDTO.getDiscount(),
                    orderDTO.getStatus(),
                    orderDTO.getPaymentMethod(),
                    orderDTO.getOrderType(),
                    orderDTO.getDeliveryAddress(),
                    userOptional.get()
            );
            Order savedOrder = orderRepository.save(order);
            return convertToDTO(savedOrder);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }


    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::convertToDTO)
                .toList();
    }

    public OrderDTO getOrderById(String id) {
        Optional<Order> orderOptional = orderRepository.findById(new ObjectId(id));
        return orderOptional.map(this::convertToDTO)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));
    }

    public OrderDTO updateOrder(String id, OrderDTO orderDTO) {
        Optional<Order> existingOrderOptional = orderRepository.findById(new ObjectId(id));
        Optional<User> userOptional = userRepository.findById(orderDTO.getUserId());

        if (existingOrderOptional.isPresent() && userOptional.isPresent()) {
            Order existingOrder = existingOrderOptional.get();
            existingOrder.setTotalAmount(orderDTO.getTotalAmount());
            existingOrder.setSubTotal(orderDTO.getSubTotal());
            existingOrder.setDiscount(orderDTO.getDiscount());
            existingOrder.setStatus(orderDTO.getStatus());
            existingOrder.setPaymentMethod(orderDTO.getPaymentMethod());
            existingOrder.setOrderType(orderDTO.getOrderType());
            existingOrder.setDeliveryAddress(orderDTO.getDeliveryAddress());
            existingOrder.setUser(userOptional.get());
            Order updatedOrder = orderRepository.save(existingOrder);
            return convertToDTO(updatedOrder);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order or User not found");
        }
    }

    public void deleteOrder(String id) {
        if (!orderRepository.existsById(new ObjectId(id))) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found");
        }
        orderRepository.deleteById(new ObjectId(id));
    }

    // Helper method to convert Order to OrderDTO
    private OrderDTO convertToDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId().toString());
        orderDTO.setTotalAmount(order.getTotalAmount());
        orderDTO.setSubTotal(order.getSubTotal());
        orderDTO.setDiscount(order.getDiscount());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setPaymentMethod(order.getPaymentMethod());
        orderDTO.setOrderType(order.getOrderType());
        orderDTO.setDeliveryAddress(order.getDeliveryAddress());

        if (order.getUser() != null) {
            orderDTO.setUserId(order.getUser().getId().toString());
        }

        return orderDTO;
    }
}