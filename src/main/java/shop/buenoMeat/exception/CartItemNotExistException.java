package shop.buenoMeat.exception;

public class CartItemNotExistException extends RuntimeException{
    public CartItemNotExistException() {
        super();
    }

    public CartItemNotExistException(String message) {
        super(message);
    }

    public CartItemNotExistException(String message, Throwable cause) {
        super(message, cause);
    }

    public CartItemNotExistException(Throwable cause) {
        super(cause);
    }
}
