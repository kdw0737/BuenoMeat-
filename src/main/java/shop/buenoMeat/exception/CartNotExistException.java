package shop.buenoMeat.exception;

public class CartNotExistException extends RuntimeException{
    public CartNotExistException() {
        super();
    }

    public CartNotExistException(String message) {
        super(message);
    }

    public CartNotExistException(String message, Throwable cause) {
        super(message, cause);
    }

    public CartNotExistException(Throwable cause) {
        super(cause);
    }
}
