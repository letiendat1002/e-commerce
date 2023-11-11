package com.ecommerce.backend.rating;

import com.ecommerce.backend.util.enums.MessageStatus;
import com.ecommerce.backend.util.exception.RequestValidationException;
import com.ecommerce.backend.util.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/ratings")
@RestController
public class RatingController {
    private final RatingService ratingService;
    private final RatingDTOMapper ratingDTOMapper;

    @GetMapping
    public RatingResponse getRatings(
            @RequestParam(value = "userID", required = false) BigInteger userID,
            @RequestParam(value = "orderID", required = false) BigInteger orderID,
            @RequestParam(value = "productID", required = false) BigInteger productID
    ) {
        var ratingDTOList = getRatingDTOList(userID, orderID, productID);

        return new RatingResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                ratingDTOList
        );
    }

    private List<RatingDTO> getRatingDTOList(BigInteger userID, BigInteger orderID, BigInteger productID) {
        var allIdNull = userID == null && orderID == null && productID == null;
        var allIdNotNull = userID != null && orderID != null && productID != null;
        var onlyUserIdNotNull = userID != null && orderID == null && productID == null;
        var onlyOrderIdNotNull = userID == null && orderID != null && productID == null;
        var onlyProductIdNotNull = userID == null && orderID == null && productID != null;
        var onlyUserIdAndOrderIdNotNull = userID != null && orderID != null && productID == null;
        var onlyUserIdAndProductIdNotNull = userID != null && orderID == null && productID != null;

        if (allIdNull) {
            return ratingService
                    .fetchAllRatings()
                    .stream()
                    .map(ratingDTOMapper)
                    .toList();
        }

        if (allIdNotNull) {
            return Collections.singletonList(
                    ratingDTOMapper.apply(
                            ratingService.fetchRatingByID(
                                    new RatingID(userID, orderID, productID)
                            )
                    )
            );
        }

        if (onlyUserIdNotNull) {
            return ratingService
                    .fetchRatingsByUserID(userID)
                    .stream()
                    .map(ratingDTOMapper)
                    .toList();
        }

        if (onlyOrderIdNotNull) {
            return Collections.singletonList(
                    ratingDTOMapper.apply(
                            ratingService.fetchRatingByOrderID(orderID)
                    )
            );
        }

        if (onlyProductIdNotNull) {
            return ratingService
                    .fetchRatingsByProductID(productID)
                    .stream()
                    .map(ratingDTOMapper)
                    .toList();
        }

        if (onlyUserIdAndOrderIdNotNull) {
            return Collections.singletonList(
                    ratingDTOMapper.apply(
                            ratingService
                                    .fetchRatingByUserIdAndOrderId(userID, orderID)
                    )
            );
        }

        if (onlyUserIdAndProductIdNotNull) {
            return ratingService
                    .fetchRatingsByUserIDAndProductID(userID, productID)
                    .stream()
                    .map(ratingDTOMapper)
                    .toList();
        }

        return Collections.singletonList(
                ratingDTOMapper.apply(
                        ratingService
                                .fetchRatingByOrderIdAndProductId(
                                        productID,
                                        orderID
                                )
                )
        );
    }

    @PostMapping
    @PreAuthorize("hasAuthority('rating:create')")
    public RatingResponse postRating(
            @Validated @RequestBody RatingRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var ratingDTOList = Collections.singletonList(
                ratingDTOMapper.apply(
                        ratingService.addRating(request)
                )
        );

        return new RatingResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                ratingDTOList
        );
    }

    @PutMapping
    @PreAuthorize("hasAuthority('rating:update')")
    public RatingResponse putRating(
            @Validated @RequestBody RatingRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var ratingDTOList = Collections.singletonList(
                ratingDTOMapper.apply(
                        ratingService.updateRating(request)
                )
        );

        return new RatingResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                ratingDTOList
        );
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('rating:delete')")
    public BaseResponse deleteRating(
            @RequestParam(value = "userID") BigInteger userID,
            @RequestParam("orderID") BigInteger orderID,
            @RequestParam(value = "productID") BigInteger productID
    ) {
        ratingService.deleteRatingByID(new RatingID(userID, orderID, productID));

        return new BaseResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL
        );
    }
}
