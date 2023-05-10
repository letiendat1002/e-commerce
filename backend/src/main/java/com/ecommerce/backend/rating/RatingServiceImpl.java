package com.ecommerce.backend.rating;


import com.ecommerce.backend.order.OrderDAO;
import com.ecommerce.backend.orderdetail.OrderDetailDAO;
import com.ecommerce.backend.orderdetail.OrderDetailID;
import com.ecommerce.backend.product.ProductDAO;
import com.ecommerce.backend.shared.exception.DuplicateResourceException;
import com.ecommerce.backend.shared.exception.FailedOperationException;
import com.ecommerce.backend.shared.exception.ResourceNotFoundException;
import com.ecommerce.backend.user.UserDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RatingServiceImpl implements RatingService {
    private final RatingDAO ratingDAO;
    private final RatingDTOMapper ratingDTOMapper;
    private final UserDAO userDAO;
    private final OrderDAO orderDAO;
    private final ProductDAO productDAO;
    private final OrderDetailDAO orderDetailDAO;

    @Override
    public List<RatingDTO> fetchAllRatings() {
        return ratingDAO
                .selectAllRatings()
                .stream()
                .map(ratingDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public List<RatingDTO> fetchRatingsByUserID(BigInteger userID) {
        checkIfUserExistsByIdOrThrow(userID);

        return ratingDAO
                .selectRatingsByUserID(userID)
                .stream()
                .map(ratingDTOMapper)
                .collect(Collectors.toList());
    }

    private void checkIfUserExistsByIdOrThrow(BigInteger userID) {
        var isExists = userDAO.existsUserByID(userID);
        if (!isExists) {
            throw new ResourceNotFoundException(
                    "User not found by userID {%d}".formatted(userID)
            );
        }
    }

    @Override
    public List<RatingDTO> fetchRatingsByProductID(BigInteger productID) {
        checkIfProductExistsByIdOrThrow(productID);

        return ratingDAO
                .selectRatingsByProductID(productID)
                .stream()
                .map(ratingDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public List<RatingDTO> fetchRatingsByUserIDAndProductID(BigInteger userID, BigInteger productID) {
        checkIfUserExistsByIdOrThrow(userID);
        checkIfProductExistsByIdOrThrow(productID);

        return ratingDAO
                .selectRatingsByUserIDAndProductID(userID, productID)
                .stream()
                .map(ratingDTOMapper)
                .collect(Collectors.toList());
    }

    private void checkIfProductExistsByIdOrThrow(BigInteger productID) {
        var isExists = productDAO.existsProductByID(productID);
        if (!isExists) {
            throw new ResourceNotFoundException(
                    "Product not found by productID {%d}".formatted(productID)
            );
        }
    }

    @Override
    public RatingDTO fetchRatingByOrderID(BigInteger orderID) {
        checkIfOrderExistsByIdOrThrow(orderID);

        return ratingDTOMapper
                .apply(selectRatingByOrderIdOrThrow(orderID));
    }

    private void checkIfOrderExistsByIdOrThrow(BigInteger orderID) {
        var isExists = orderDAO.existsOrderByID(orderID);
        if (!isExists) {
            throw new ResourceNotFoundException(
                    "Order not found by orderID {%d}".formatted(orderID)
            );
        }
    }

    @Override
    public RatingDTO fetchRatingByUserIdAndOrderId(BigInteger userID, BigInteger orderID) {
        checkIfUserExistsByIdOrThrow(userID);
        checkIfOrderExistsByIdOrThrow(orderID);

        return ratingDAO
                .selectRatingByUserIDAndOrderID(userID, orderID)
                .map(ratingDTOMapper)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Rating not found by userID {%d} and orderID {%d}".formatted(userID, orderID)
                        )
                );
    }

    @Override
    public RatingDTO fetchRatingByOrderIdAndProductId(BigInteger productID, BigInteger orderID) {
        checkIfProductExistsByIdOrThrow(productID);
        checkIfOrderExistsByIdOrThrow(orderID);

        return ratingDAO
                .selectRatingByProductIDAndOrderID(productID, orderID)
                .map(ratingDTOMapper)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Rating not found by productID {%d} and orderID {%d}".formatted(productID, orderID)
                        )
                );
    }

    private Rating selectRatingByOrderIdOrThrow(BigInteger orderID) {
        return ratingDAO
                .selectRatingByOrderID(orderID)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Rating not found by orderID {%d}".formatted(orderID)
                ));
    }

    @Override
    public RatingDTO fetchRatingByID(RatingID ratingID) {
        checkIfRatingExistsByIdOrThrow(ratingID);

        return ratingDAO
                .selectRatingByID(ratingID)
                .map(ratingDTOMapper)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Rating not found by %s".formatted(ratingID)
                        )
                );
    }

    private void checkIfRatingExistsByIdOrThrow(RatingID ratingID) {
        var isExists = ratingDAO.existsRatingByID(ratingID);
        if (!isExists) {
            throw new ResourceNotFoundException(
                    "Rating not found by %s".formatted(ratingID)
            );
        }
    }

    @Override
    public RatingDTO addRating(RatingRequest request) {
        checkIfOrderDetailExistsByIdOrThrow(request.orderID(), request.productID());

        checkIfOrderBelongsToUserOrThrow(request.userID(), request.orderID());

        checkIfRatingNotExistsByIdOrThrow(
                new RatingID(
                        request.userID(),
                        request.orderID(),
                        request.productID()
                )
        );

        var user = userDAO.selectUserByID(request.userID())
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "User not found by userID {%d}".formatted(request.userID())
                        )
                );

        var rating = new Rating(
                request.userID(),
                request.orderID(),
                request.productID(),
                user,
                request.rateAmount(),
                request.comment(),
                LocalDate.now()
        );

        return ratingDAO
                .insertRating(rating)
                .map(ratingDTOMapper)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to add rating"
                        )
                );
    }

    private void checkIfOrderBelongsToUserOrThrow(BigInteger userID, BigInteger orderID) {
        var user = userDAO
                .selectUserByID(userID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "User not found by userID {%d}".formatted(userID)
                        )
                );

        var isBelongsToUser = orderDAO.existsOrderByOrderIDAndUser(
                orderID,
                user
        );
        if (!isBelongsToUser) {
            throw new ResourceNotFoundException(
                    "Order {%d} doesn't belong to this user {%d}".formatted(orderID, userID)
            );
        }
    }

    private void checkIfOrderDetailExistsByIdOrThrow(BigInteger orderID, BigInteger productID) {
        var orderDetailID = new OrderDetailID(orderID, productID);
        var isExists = orderDetailDAO.existsOrderDetailByID(
                orderDetailID
        );
        if (!isExists) {
            throw new ResourceNotFoundException(
                    "OrderDetail not found by %s"
                            .formatted(orderDetailID)
            );
        }
    }

    private void checkIfRatingNotExistsByIdOrThrow(RatingID ratingID) {
        var isExists = ratingDAO.existsRatingByID(ratingID);
        if (isExists) {
            throw new DuplicateResourceException(
                    "Rating already exists by %s".formatted(ratingID)
            );
        }
    }

    @Override
    public RatingDTO updateRating(RatingRequest request) {
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
                .map(ratingDTOMapper)
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
}
