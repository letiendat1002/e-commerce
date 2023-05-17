package com.ecommerce.backend.rating;


import com.ecommerce.backend.order.OrderService;
import com.ecommerce.backend.orderdetail.OrderDetailID;
import com.ecommerce.backend.orderdetail.OrderDetailService;
import com.ecommerce.backend.product.ProductService;
import com.ecommerce.backend.util.exception.DuplicateResourceException;
import com.ecommerce.backend.util.exception.FailedOperationException;
import com.ecommerce.backend.util.exception.ResourceNotFoundException;
import com.ecommerce.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;

@RequiredArgsConstructor
@Service
public class RatingServiceImpl implements RatingService {
    private final RatingDAO ratingDAO;
    private final UserService userService;
    private final ProductService productService;
    private final OrderService orderService;
    private final OrderDetailService orderDetailService;

    @Override
    public List<Rating> fetchAllRatings() {
        return ratingDAO.selectAllRatings();
    }

    @Override
    public List<Rating> fetchRatingsByUserID(BigInteger userID) {
        checkIfUserExistsByIdOrThrow(userID);

        return ratingDAO.selectRatingsByUserID(userID);
    }

    private void checkIfUserExistsByIdOrThrow(BigInteger userID) {
        var isExists = userService.existsUserByID(userID);
        if (!isExists) {
            throw new ResourceNotFoundException(
                    "User not found by userID {%d}".formatted(userID)
            );
        }
    }

    @Override
    public List<Rating> fetchRatingsByProductID(BigInteger productID) {
        checkIfProductExistsByIdOrThrow(productID);

        return ratingDAO.selectRatingsByProductID(productID);
    }

    private void checkIfProductExistsByIdOrThrow(BigInteger productID) {
        var isExists = productService.existsProductByID(productID);
        if (!isExists) {
            throw new ResourceNotFoundException(
                    "Product not found by productID {%d}".formatted(productID)
            );
        }
    }

    @Override
    public List<Rating> fetchRatingsByUserIDAndProductID(
            BigInteger userID,
            BigInteger productID
    ) {
        checkIfUserExistsByIdOrThrow(userID);
        checkIfProductExistsByIdOrThrow(productID);

        return ratingDAO
                .selectRatingsByUserIDAndProductID(userID, productID);
    }

    @Override
    public Rating fetchRatingByOrderID(BigInteger orderID) {
        checkIfOrderExistsByIdOrThrow(orderID);

        return ratingDAO
                .selectRatingByOrderID(orderID)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Rating not found by orderID {%d}".formatted(orderID)
                ));
    }

    private void checkIfOrderExistsByIdOrThrow(BigInteger orderID) {
        var isExists = orderService.existsOrderByID(orderID);
        if (!isExists) {
            throw new ResourceNotFoundException(
                    "Order not found by orderID {%d}".formatted(orderID)
            );
        }
    }

    @Override
    public Rating fetchRatingByUserIdAndOrderId(BigInteger userID,
                                                BigInteger orderID) {
        checkIfUserExistsByIdOrThrow(userID);
        checkIfOrderExistsByIdOrThrow(orderID);

        return ratingDAO
                .selectRatingByUserIDAndOrderID(userID, orderID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Rating not found by userID {%d} and orderID {%d}"
                                        .formatted(userID, orderID)
                        )
                );
    }

    @Override
    public Rating fetchRatingByOrderIdAndProductId(BigInteger productID,
                                                   BigInteger orderID) {
        checkIfProductExistsByIdOrThrow(productID);
        checkIfOrderExistsByIdOrThrow(orderID);

        return ratingDAO
                .selectRatingByProductIDAndOrderID(productID, orderID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Rating not found by productID {%d} and orderID {%d}"
                                        .formatted(productID, orderID)
                        )
                );
    }

    @Override
    public Rating fetchRatingByID(RatingID ratingID) {
        return ratingDAO
                .selectRatingByID(ratingID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Rating not found by %s".formatted(ratingID)
                        )
                );
    }

    @Override
    public Rating addRating(RatingRequest request) {
        checkIfOrderDetailExistsByIdOrThrow(
                new OrderDetailID(
                        request.orderID(),
                        request.productID()
                )
        );

        checkIfOrderBelongsToUserOrThrow(
                request.userID(),
                request.orderID()
        );

        checkIfRatingNotExistByIdOrThrow(
                new RatingID(
                        request.userID(),
                        request.orderID(),
                        request.productID()
                )
        );

        var user = userService.fetchUserByUserID(request.userID());

        var rating = new Rating(
                request.userID(),
                request.orderID(),
                request.productID(),
                user,
                request.rateAmount(),
                request.comment()
        );

        return ratingDAO
                .insertRating(rating)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to add rating"
                        )
                );
    }

    private void checkIfOrderBelongsToUserOrThrow(
            BigInteger userID,
            BigInteger orderID
    ) {
        var user = userService.fetchUserByUserID(userID);
        var isBelongsToUser = orderService.existsOrderByOrderIDAndUser(
                orderID,
                user
        );

        if (!isBelongsToUser) {
            throw new ResourceNotFoundException(
                    "Order {%d} doesn't belong to this user {%d}"
                            .formatted(orderID, userID)
            );
        }
    }

    private void checkIfOrderDetailExistsByIdOrThrow(OrderDetailID orderDetailID) {
        var isExists = orderDetailService.existsOrderDetailByID(orderDetailID);

        if (!isExists) {
            throw new ResourceNotFoundException(
                    "OrderDetail not found by %s"
                            .formatted(orderDetailID)
            );
        }
    }

    private void checkIfRatingNotExistByIdOrThrow(RatingID ratingID) {
        var isExists = ratingDAO.existsRatingByID(ratingID);
        if (isExists) {
            throw new DuplicateResourceException(
                    "Rating already exists by %s".formatted(ratingID)
            );
        }
    }

    @Override
    public Rating updateRating(RatingRequest request) {
        var rating = selectRatingByIdOrThrow(
                new RatingID(
                        request.userID(),
                        request.orderID(),
                        request.productID()
                )
        );

        checkAndUpdateChangesOrThrow(request, rating);

        return ratingDAO
                .updateRating(rating)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to update rating"
                        )
                );
    }

    private Rating selectRatingByIdOrThrow(RatingID ratingID) {
        return ratingDAO
                .selectRatingByID(ratingID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Rating not found by %s".formatted(ratingID)
                        )
                );
    }

    private void checkAndUpdateChangesOrThrow(RatingRequest request, Rating rating) {
        var isChanged = false;

        if (!request.rateAmount().equals(rating.getRateAmount())) {
            rating.setRateAmount(request.rateAmount());
            isChanged = true;
        }

        if (!request.comment().equals(rating.getComment())) {
            rating.setComment(request.comment());
            isChanged = true;
        }


        if (!isChanged) {
            throw new DuplicateResourceException(
                    "No data changes detected"
            );
        }
    }

    @Override
    public void deleteRatingByID(RatingID ratingID) {
        checkIfRatingExistsByIdOrThrow(ratingID);

        ratingDAO.deleteRatingByID(ratingID);
    }

    private void checkIfRatingExistsByIdOrThrow(RatingID ratingID) {
        var isExists = ratingDAO.existsRatingByID(ratingID);
        if (!isExists) {
            throw new ResourceNotFoundException(
                    "Rating not found by %s".formatted(ratingID)
            );
        }
    }
}
