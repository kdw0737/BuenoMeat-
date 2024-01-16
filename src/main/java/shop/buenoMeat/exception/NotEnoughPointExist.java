package shop.buenoMeat.exception;

public class NotEnoughPointExist extends RuntimeException{
    public NotEnoughPointExist() {
        super();
    }

    public NotEnoughPointExist(String message) {
        super(message);
    }

    public NotEnoughPointExist(String message, Throwable cause) {
        super(message, cause);
    }

    public NotEnoughPointExist(Throwable cause) {
        super(cause);
    }
}
