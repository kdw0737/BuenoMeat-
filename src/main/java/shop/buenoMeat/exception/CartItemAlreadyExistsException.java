package shop.buenoMeat.exception;

public class CartItemAlreadyExistsException extends RuntimeException {

    public CartItemAlreadyExistsException() {
        super();
    }

    public CartItemAlreadyExistsException(String message) {
        super(message);
    }

    public CartItemAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }

    public CartItemAlreadyExistsException(Throwable cause) {
        super(cause);
    }
}
