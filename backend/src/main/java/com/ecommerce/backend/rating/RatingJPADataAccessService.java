package com.ecommerce.backend.rating;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class RatingJPADataAccessService implements RatingDAO {
    private final RatingRepository ratingRepository;

    @Override
    public List<Rating> selectAllRatings() {
        return ratingRepository.findAll();
    }

    @Override
    public List<Rating> selectRatingsByUserID(BigInteger userID) {
        return ratingRepository.findAllByUserID(userID);
    }

    @Override
    public List<Rating> selectRatingsByProductID(BigInteger productID) {
        return ratingRepository.findAllByProductID(productID);
    }

    @Override
    public List<Rating> selectRatingsByUserIDAndProductID(BigInteger userID, BigInteger productID) {
        return ratingRepository.findAllByUserIDAndProductID(userID, productID);
    }

    @Override
    public Optional<Rating> selectRatingByOrderID(BigInteger orderID) {
        return Optional.ofNullable(ratingRepository.findByOrderID(orderID));
    }

    @Override
    public Optional<Rating> selectRatingByID(RatingID ratingID) {
        return ratingRepository.findById(ratingID);
    }

    @Override
    public Optional<Rating> insertRating(Rating rating) {
        return Optional.of(ratingRepository.save(rating));
    }

    @Override
    public Optional<Rating> updateRating(Rating update) {
        return Optional.of(ratingRepository.save(update));
    }

    @Override
    public void deleteRatingByID(RatingID ratingID) {
        ratingRepository.deleteById(ratingID);
    }

    @Override
    public boolean existsRatingByID(RatingID ratingID) {
        return ratingRepository.existsById(ratingID);
    }

    @Override
    public Optional<Rating> selectRatingByUserIDAndOrderID(BigInteger userID, BigInteger orderID) {
        return Optional.ofNullable(
                ratingRepository.findByUserIDAndOrderID(userID, orderID)
        );
    }

    @Override
    public Optional<Rating> selectRatingByProductIDAndOrderID(BigInteger productID, BigInteger orderID) {
        return Optional.ofNullable(
                ratingRepository.findByProductIDAndOrderID(productID, orderID)
        );
    }

    @Override
    public boolean existsRatingByOrderIDAndProductID(BigInteger orderID, BigInteger productID) {
        return ratingRepository.existsByOrderIDAndProductID(orderID, productID);
    }
}
