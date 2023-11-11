package com.ecommerce.backend.service.rating;

import com.ecommerce.backend.order.OrderService;
import com.ecommerce.backend.orderdetail.OrderDetailID;
import com.ecommerce.backend.orderdetail.OrderDetailService;
import com.ecommerce.backend.product.ProductService;
import com.ecommerce.backend.rating.*;
import com.ecommerce.backend.util.exception.DuplicateResourceException;
import com.ecommerce.backend.util.exception.FailedOperationException;
import com.ecommerce.backend.util.exception.ResourceNotFoundException;
import com.ecommerce.backend.user.User;
import com.ecommerce.backend.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigInteger;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RatingServiceImplTest {
    private RatingServiceImpl ratingService;
    @Mock
    private RatingDAO ratingDAO;
    @Mock
    private UserService userService;
    @Mock
    private ProductService productService;
    @Mock
    private OrderService orderService;
    @Mock
    private OrderDetailService orderDetailService;

    @BeforeEach
    void setUp() {
        ratingService = new RatingServiceImpl(
                ratingDAO,
                userService,
                productService,
                orderService,
                orderDetailService
        );
    }

    @Test
    void fetchAllRatings() {
        // When
        ratingService.fetchAllRatings();

        // Then
        verify(ratingDAO).selectAllRatings();
    }

    @Test
    void fetchRatingsByUserID() {
        // Given
        var id = BigInteger.ONE;

        // When
        when(userService.existsUserByID(id)).thenReturn(true);
        ratingService.fetchRatingsByUserID(id);

        // Then
        verify(userService).existsUserByID(id);
        verify(ratingDAO).selectRatingsByUserID(id);
    }

    @Test
    void fetchRatingsByProductID() {
        // Given
        var id = BigInteger.ONE;

        // When
        when(productService.existsProductByID(id)).thenReturn(true);
        ratingService.fetchRatingsByProductID(id);

        // Then
        verify(productService).existsProductByID(id);
        verify(ratingDAO).selectRatingsByProductID(id);
    }

    @Test
    void fetchRatingsByUserIDAndProductID() {
        // Given
        var id = BigInteger.ONE;

        // When
        when(userService.existsUserByID(id)).thenReturn(true);
        when(productService.existsProductByID(id)).thenReturn(true);
        ratingService.fetchRatingsByUserIDAndProductID(id, id);

        // Then
        verify(userService).existsUserByID(id);
        verify(productService).existsProductByID(id);
        verify(ratingDAO).selectRatingsByUserIDAndProductID(id, id);
    }

    @Test
    void fetchRatingByOrderID() {
        // Given
        var id = BigInteger.ONE;
        var rating = new Rating();

        // When
        when(orderService.existsOrderByID(id)).thenReturn(true);
        when(ratingDAO.selectRatingByOrderID(id))
                .thenReturn(Optional.of(rating));
        ratingService.fetchRatingByOrderID(id);

        // Then
        verify(orderService).existsOrderByID(id);
        verify(ratingDAO).selectRatingByOrderID(id);
    }

    @Test
    void whenFetchRatingByOrderID_butNotExistOrderID_thenThrowException() {
        // Given
        var id = BigInteger.ONE;

        // When
        when(orderService.existsOrderByID(id)).thenReturn(false);

        // Then
        assertThatThrownBy(() -> ratingService.fetchRatingByOrderID(id))
                .isInstanceOf(ResourceNotFoundException.class);
        verify(orderService).existsOrderByID(id);
        verify(ratingDAO, never()).selectRatingByOrderID(id);
    }

    @Test
    void whenFetchRatingByOrderID_butReturnEmptyOptional_thenThrowException() {
        // Given
        var id = BigInteger.ONE;

        // When
        when(orderService.existsOrderByID(id)).thenReturn(true);
        when(ratingDAO.selectRatingByOrderID(id))
                .thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> ratingService.fetchRatingByOrderID(id))
                .isInstanceOf(ResourceNotFoundException.class);
        verify(orderService).existsOrderByID(id);
        verify(ratingDAO).selectRatingByOrderID(id);
    }

    @Test
    void fetchRatingByUserIdAndOrderId() {
        // Given
        var userID = BigInteger.ONE;
        var orderID = BigInteger.ONE;
        var rating = new Rating();

        // When
        when(userService.existsUserByID(userID)).thenReturn(true);
        when(orderService.existsOrderByID(orderID)).thenReturn(true);
        when(ratingDAO.selectRatingByUserIDAndOrderID(userID, orderID))
                .thenReturn(Optional.of(rating));
        ratingService.fetchRatingByUserIdAndOrderId(userID, orderID);

        // Then
        verify(userService).existsUserByID(userID);
        verify(orderService).existsOrderByID(orderID);
        verify(ratingDAO).selectRatingByUserIDAndOrderID(userID, orderID);
    }

    @Test
    void whenFetchRatingByUserIdAndOrderId_butNotExistUserID_thenThrowException() {
        // Given
        var userID = BigInteger.ONE;
        var orderID = BigInteger.ONE;

        // When
        when(userService.existsUserByID(userID)).thenReturn(false);

        // Then
        assertThatThrownBy(() -> ratingService.fetchRatingByUserIdAndOrderId(userID, orderID))
                .isInstanceOf(ResourceNotFoundException.class);
        verify(userService).existsUserByID(userID);
        verify(orderService, never()).existsOrderByID(orderID);
        verify(ratingDAO, never()).selectRatingByUserIDAndOrderID(userID, orderID);
    }

    @Test
    void whenFetchRatingByUserIdAndOrderId_butNotExistOrderID_thenThrowException() {
        // Given
        var userID = BigInteger.ONE;
        var orderID = BigInteger.ONE;

        // When
        when(userService.existsUserByID(userID)).thenReturn(true);
        when(orderService.existsOrderByID(orderID)).thenReturn(false);

        // Then
        assertThatThrownBy(() -> ratingService.fetchRatingByUserIdAndOrderId(userID, orderID))
                .isInstanceOf(ResourceNotFoundException.class);
        verify(userService).existsUserByID(userID);
        verify(orderService).existsOrderByID(orderID);
        verify(ratingDAO, never()).selectRatingByUserIDAndOrderID(userID, orderID);
    }

    @Test
    void whenFetchRatingByUserIdAndOrderId_butReturnEmptyOptional_thenThrowException() {
        // Given
        var userID = BigInteger.ONE;
        var orderID = BigInteger.ONE;

        // When
        when(userService.existsUserByID(userID)).thenReturn(true);
        when(orderService.existsOrderByID(orderID)).thenReturn(true);
        when(ratingDAO.selectRatingByUserIDAndOrderID(userID, orderID))
                .thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> ratingService.fetchRatingByUserIdAndOrderId(userID, orderID))
                .isInstanceOf(ResourceNotFoundException.class);
        verify(userService).existsUserByID(userID);
        verify(orderService).existsOrderByID(orderID);
        verify(ratingDAO).selectRatingByUserIDAndOrderID(userID, orderID);
    }

    @Test
    void fetchRatingByOrderIdAndProductId() {
        // Given
        var orderID = BigInteger.ONE;
        var productID = BigInteger.ONE;
        var rating = new Rating();

        // When
        when(orderService.existsOrderByID(orderID)).thenReturn(true);
        when(productService.existsProductByID(productID)).thenReturn(true);
        when(ratingDAO.selectRatingByProductIDAndOrderID(productID, orderID))
                .thenReturn(Optional.of(rating));
        ratingService.fetchRatingByOrderIdAndProductId(orderID, productID);

        // Then
        verify(orderService).existsOrderByID(orderID);
        verify(productService).existsProductByID(productID);
        verify(ratingDAO).selectRatingByProductIDAndOrderID(productID, orderID);
    }

    @Test
    void whenFetchRatingByOrderIdAndProductId_butNotExistOrderID_thenThrowException() {
        // Given
        var orderID = BigInteger.ONE;
        var productID = BigInteger.ONE;

        // When
        when(productService.existsProductByID(productID)).thenReturn(true);
        when(orderService.existsOrderByID(orderID)).thenReturn(false);

        // Then
        assertThatThrownBy(() -> ratingService.fetchRatingByOrderIdAndProductId(orderID, productID))
                .isInstanceOf(ResourceNotFoundException.class);
        verify(productService).existsProductByID(productID);
        verify(ratingDAO, never()).selectRatingByProductIDAndOrderID(productID, orderID);
    }

    @Test
    void whenFetchRatingByOrderIdAndProductId_butNotExistProductID_thenThrowException() {
        // Given
        var orderID = BigInteger.ONE;
        var productID = BigInteger.ONE;

        // When
        when(productService.existsProductByID(productID)).thenReturn(false);

        // Then
        assertThatThrownBy(() -> ratingService.fetchRatingByOrderIdAndProductId(orderID, productID))
                .isInstanceOf(ResourceNotFoundException.class);
        verify(productService).existsProductByID(productID);
        verify(ratingDAO, never()).selectRatingByProductIDAndOrderID(productID, orderID);
    }

    @Test
    void whenFetchRatingByOrderIdAndProductId_butReturnEmptyOptional_thenThrowException() {
        // Given
        var orderID = BigInteger.ONE;
        var productID = BigInteger.ONE;

        // When
        when(orderService.existsOrderByID(orderID)).thenReturn(true);
        when(productService.existsProductByID(productID)).thenReturn(true);
        when(ratingDAO.selectRatingByProductIDAndOrderID(productID, orderID))
                .thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> ratingService.fetchRatingByOrderIdAndProductId(orderID, productID))
                .isInstanceOf(ResourceNotFoundException.class);
        verify(orderService).existsOrderByID(orderID);
        verify(productService).existsProductByID(productID);
        verify(ratingDAO).selectRatingByProductIDAndOrderID(productID, orderID);
    }

    @Test
    void fetchRatingByID() {
        // Given
        var id = BigInteger.ONE;
        var ratingID = new RatingID(id, id, id);
        var rating = new Rating();

        // When
        when(ratingDAO.selectRatingByID(ratingID)).thenReturn(Optional.of(rating));
        ratingService.fetchRatingByID(ratingID);

        // Then
        verify(ratingDAO).selectRatingByID(ratingID);
    }

    @Test
    void whenFetchRatingByID_butReturnEmptyOptional_thenThrowException() {
        // Given
        var id = BigInteger.ONE;
        var ratingID = new RatingID(id, id, id);

        // When
        when(ratingDAO.selectRatingByID(ratingID)).thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> ratingService.fetchRatingByID(ratingID))
                .isInstanceOf(ResourceNotFoundException.class);
        verify(ratingDAO).selectRatingByID(ratingID);
    }

    @Test
    void addRating() {
        // Given
        var id = BigInteger.ONE;
        var orderDetailID = new OrderDetailID(id, id);
        var user = new User();
        var ratingID = new RatingID(id, id, id);
        var request = new RatingRequest(
                id, id, id, 4, "ok"
        );
        var rating = new Rating(
                request.userID(),
                request.orderID(),
                request.productID(),
                user,
                request.rateAmount(),
                request.comment()
        );

        // When
        when(orderDetailService.existsOrderDetailByID(orderDetailID))
                .thenReturn(true);
        when(userService.fetchUserByUserID(id)).thenReturn(user);
        when(orderService.existsOrderByOrderIDAndUser(id, user))
                .thenReturn(true);
        when(ratingDAO.existsRatingByID(ratingID)).thenReturn(false);
        when(ratingDAO.insertRating(rating)).thenReturn(Optional.of(rating));
        ratingService.addRating(request);

        // Then
        verify(ratingDAO).insertRating(rating);
    }

    @Test
    void whenAddRating_butOrderDetailNotExistsById_thenThrowException() {
        // Given
        var id = BigInteger.ONE;
        var orderDetailID = new OrderDetailID(id, id);
        var request = new RatingRequest(
                id, id, id, 4, "ok"
        );
        var user = new User();

        // When
        when(orderDetailService.existsOrderDetailByID(orderDetailID))
                .thenReturn(false);

        // Then
        assertThatThrownBy(
                () -> ratingService.addRating(request)
        ).isInstanceOf(ResourceNotFoundException.class);
        verify(userService, never()).fetchUserByUserID(id);
        verify(orderService, never())
                .existsOrderByOrderIDAndUser(id, user);
        verify(ratingDAO, never()).existsRatingByID(any(RatingID.class));
        verify(ratingDAO, never()).insertRating(any(Rating.class));
    }

    @Test
    void whenAddRating_butOrderNotBelongToUser_thenThrowException() {
        // Given
        var id = BigInteger.ONE;
        var orderDetailID = new OrderDetailID(id, id);
        var user = new User();
        var request = new RatingRequest(
                id, id, id, 4, "ok"
        );

        // When
        when(orderDetailService.existsOrderDetailByID(orderDetailID))
                .thenReturn(true);
        when(userService.fetchUserByUserID(id)).thenReturn(user);
        when(orderService.existsOrderByOrderIDAndUser(id, user))
                .thenReturn(false);

        // Then
        assertThatThrownBy(
                () -> ratingService.addRating(request)
        ).isInstanceOf(ResourceNotFoundException.class);
        verify(ratingDAO, never()).existsRatingByID(any(RatingID.class));
        verify(ratingDAO, never()).insertRating(any(Rating.class));
    }

    @Test
    void whenAddRating_butRatingAlreadyExistsByID_thenThrowException() {
        // Given
        var id = BigInteger.ONE;
        var orderDetailID = new OrderDetailID(id, id);
        var user = new User();
        var ratingID = new RatingID(id, id, id);
        var request = new RatingRequest(
                id, id, id, 4, "ok"
        );

        // When
        when(orderDetailService.existsOrderDetailByID(orderDetailID))
                .thenReturn(true);
        when(userService.fetchUserByUserID(id)).thenReturn(user);
        when(orderService.existsOrderByOrderIDAndUser(id, user))
                .thenReturn(true);
        when(ratingDAO.existsRatingByID(ratingID)).thenReturn(true);

        // Then
        assertThatThrownBy(
                () -> ratingService.addRating(request)
        ).isInstanceOf(DuplicateResourceException.class);
        verify(ratingDAO, never()).insertRating(any(Rating.class));
    }

    @Test
    void whenAddRating_butUserNotFoundByID_thenThrowException() {
        // Given
        var id = BigInteger.ONE;
        var orderDetailID = new OrderDetailID(id, id);
        var user = new User();
        var request = new RatingRequest(
                id, id, id, 4, "ok"
        );

        // When
        when(orderDetailService.existsOrderDetailByID(orderDetailID))
                .thenReturn(true);
        when(userService.fetchUserByUserID(id)).thenReturn(null);

        // Then
        assertThatThrownBy(
                () -> ratingService.addRating(request)
        ).isInstanceOf(ResourceNotFoundException.class);
        verify(orderService, never())
                .existsOrderByOrderIDAndUser(id, user);
        verify(ratingDAO, never()).existsRatingByID(any(RatingID.class));
        verify(ratingDAO, never()).insertRating(any(Rating.class));
    }

    @Test
    void whenAddRatingFailed_thenThrowException() {
        // Given
        var id = BigInteger.ONE;
        var orderDetailID = new OrderDetailID(id, id);
        var user = new User();
        var ratingID = new RatingID(id, id, id);
        var request = new RatingRequest(
                id, id, id, 4, "ok"
        );
        var rating = new Rating(
                request.userID(),
                request.orderID(),
                request.productID(),
                user,
                request.rateAmount(),
                request.comment()
        );

        // When
        when(orderDetailService.existsOrderDetailByID(orderDetailID))
                .thenReturn(true);
        when(userService.fetchUserByUserID(id)).thenReturn(user);
        when(orderService.existsOrderByOrderIDAndUser(id, user))
                .thenReturn(true);
        when(ratingDAO.existsRatingByID(ratingID)).thenReturn(false);
        when(ratingDAO.insertRating(rating)).thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(
                () -> ratingService.addRating(request)
        ).isInstanceOf(FailedOperationException.class);
    }

    @Test
    void updateRating() {
        // Given
        var id = BigInteger.ONE;
        var user = new User();
        var ratingID = new RatingID(id, id, id);
        var request = new RatingRequest(
                id, id, id, 4, "okk"
        );
        var rating = new Rating(
                id, id, id, user, 2, "ok"
        );

        // When
        when(ratingDAO.selectRatingByID(ratingID))
                .thenReturn(Optional.of(rating));
        when(ratingDAO.updateRating(rating)).thenReturn(Optional.of(rating));
        ratingService.updateRating(request);

        // Then
        var captor = ArgumentCaptor.forClass(Rating.class);
        verify(ratingDAO).updateRating(captor.capture());
        verify(ratingDAO).selectRatingByID(ratingID);

        var capturedRating = captor.getValue();
        assertThat(capturedRating.getUserID()).isEqualTo(request.userID());
        assertThat(capturedRating.getOrderID()).isEqualTo(request.orderID());
        assertThat(capturedRating.getProductID()).isEqualTo(request.productID());
        assertThat(capturedRating.getRateAmount()).isEqualTo(request.rateAmount());
        assertThat(capturedRating.getComment()).isEqualTo(request.comment());
    }

    @Test
    void whenUpdateRating_butRatingNotFoundByID_thenThrowException() {
        // Given
        var id = BigInteger.ONE;
        var user = new User();
        var ratingID = new RatingID(id, id, id);
        var request = new RatingRequest(
                id, id, id, 4, "ok"
        );
        var rating = new Rating(
                id, id, id, user, 2, "ok"
        );

        // When
        when(ratingDAO.selectRatingByID(ratingID))
                .thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(
                () -> ratingService.updateRating(request)
        ).isInstanceOf(ResourceNotFoundException.class);
        verify(ratingDAO, never()).updateRating(rating);
    }

    @Test
    void whenUpdateRatingFailed_thenThrowException() {
        // Given
        var id = BigInteger.ONE;
        var user = new User();
        var ratingID = new RatingID(id, id, id);
        var request = new RatingRequest(
                id, id, id, 4, "ok"
        );
        var rating = new Rating(
                id, id, id, user, 2, "ok"
        );

        // When
        when(ratingDAO.selectRatingByID(ratingID))
                .thenReturn(Optional.of(rating));
        when(ratingDAO.updateRating(rating)).thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(
                () -> ratingService.updateRating(request)
        ).isInstanceOf(FailedOperationException.class);
        verify(ratingDAO).selectRatingByID(ratingID);
        verify(ratingDAO).updateRating(rating);
    }

    @Test
    void whenUpdateRating_butHasNoChange_thenThrowException() {
        // Given
        var id = BigInteger.ONE;
        var user = new User();
        var ratingID = new RatingID(id, id, id);
        var request = new RatingRequest(
                id, id, id, 4, "ok"
        );
        var rating = new Rating(
                request.userID(),
                request.orderID(),
                request.productID(),
                user,
                request.rateAmount(),
                request.comment()
        );

        // When
        when(ratingDAO.selectRatingByID(ratingID))
                .thenReturn(Optional.of(rating));

        // Then
        assertThatThrownBy(
                () -> ratingService.updateRating(request)
        ).isInstanceOf(DuplicateResourceException.class);
        verify(ratingDAO).selectRatingByID(ratingID);
        verify(ratingDAO, never()).updateRating(rating);
    }

    @Test
    void deleteRatingByID() {
        // Given
        var id = BigInteger.ONE;
        var ratingID = new RatingID(id, id, id);

        // When
        when(ratingDAO.existsRatingByID(ratingID)).thenReturn(true);
        ratingService.deleteRatingByID(ratingID);

        // Then
        verify(ratingDAO).existsRatingByID(ratingID);
        verify(ratingDAO).deleteRatingByID(ratingID);
    }

    @Test
    void whenDeleteRating_butRatingNotExistByID_thenThrowException() {
        // Given
        var id = BigInteger.ONE;
        var ratingID = new RatingID(id, id, id);

        // When
        when(ratingDAO.existsRatingByID(ratingID)).thenReturn(false);

        // Then
        assertThatThrownBy(
                () -> ratingService.deleteRatingByID(ratingID)
        ).isInstanceOf(ResourceNotFoundException.class);
        verify(ratingDAO).existsRatingByID(ratingID);
        verify(ratingDAO, never()).deleteRatingByID(ratingID);
    }
}
