package com.ecommerce.backend.rating;

import com.ecommerce.backend.shared.enums.MessageStatus;
import com.ecommerce.backend.shared.exception.RequestValidationException;
import com.ecommerce.backend.shared.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @GetMapping
    public RatingResponse getRatings(
            @RequestParam(value = "userID", required = false) BigInteger userID,
            @RequestParam(value = "orderID", required = false) BigInteger orderID,
            @RequestParam(value = "productID", required = false) BigInteger productID
    ) {
        List<RatingDTO> ratingDTOList;

        if (userID == null && orderID == null && productID == null) {
            ratingDTOList = ratingService.fetchAllRatings();
        } else if (userID != null && orderID == null && productID == null) {
            ratingDTOList = ratingService.fetchRatingsByUserID(userID);
        } else if (userID == null && orderID != null && productID == null) {
            ratingDTOList = Collections.singletonList(
                    ratingService.fetchRatingByOrderID(orderID)
            );
        } else if (userID == null && orderID == null) {
            ratingDTOList = ratingService.fetchRatingsByProductID(productID);
        } else if (userID != null && orderID != null && productID == null) {
            ratingDTOList = Collections.singletonList(
                    ratingService.fetchRatingByUserIdAndOrderId(userID, orderID)
            );
        } else if (userID != null && orderID == null) {
            ratingDTOList = ratingService.fetchRatingsByUserIDAndProductID(userID, productID);
        } else if (userID == null) {
            ratingDTOList = Collections.singletonList(
                    ratingService.fetchRatingByProductIdAndOrderId(productID, orderID)
            );
        } else {
            ratingDTOList = Collections.singletonList(
                    ratingService.fetchRatingByID(
                            new RatingID(userID, orderID, productID)
                    ));
        }

        return new RatingResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                ratingDTOList
        );
    }

    @PostMapping
    public RatingResponse postRating(
            @Validated @RequestBody RatingRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var ratingDTOList = Collections.singletonList(
                ratingService.addRating(request)
        );

        return new RatingResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                ratingDTOList
        );
    }

    @DeleteMapping
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

    @PutMapping
    public RatingResponse putRating(
            @Validated @RequestBody RatingRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var ratingDTOList = Collections.singletonList(
                ratingService.updateRating(request)
        );

        return new RatingResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                ratingDTOList
        );
    }
}
