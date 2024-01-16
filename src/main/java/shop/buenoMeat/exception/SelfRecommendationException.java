package shop.buenoMeat.exception;

public class SelfRecommendationException extends RuntimeException {
    public SelfRecommendationException() {
        super();
    }

    public SelfRecommendationException(String message) {
        super(message);
    }

    public SelfRecommendationException(String message, Throwable cause) {
        super(message, cause);
    }

    public SelfRecommendationException(Throwable cause) {
        super(cause);
    }
}
