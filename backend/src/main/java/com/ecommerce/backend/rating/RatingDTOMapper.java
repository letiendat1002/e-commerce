package com.ecommerce.backend.rating;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class RatingDTOMapper implements Function<Rating, RatingDTO> {
    @Override
    public RatingDTO apply(Rating rating) {
        return new RatingDTO(
                rating.getUserID(),
                rating.getOrderID(),
                rating.getProductID(),
                rating.getUser().getFullName(),
                rating.getRateAmount(),
                rating.getComment(),
                rating.getDateRating()
        );
    }
}
