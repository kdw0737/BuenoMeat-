package shop.buenoMeat.exception;

public class AccessTokenNotExistException extends RuntimeException{
    public AccessTokenNotExistException() {
        super();
    }

    public AccessTokenNotExistException(String message) {
        super(message);
    }

    public AccessTokenNotExistException(String message, Throwable cause) {
        super(message, cause);
    }

    public AccessTokenNotExistException(Throwable cause) {
        super(cause);
    }
}
