export interface ProductReviewProps {
    id: number;
    username: string;
    starRating: number;
    reviewTime: string;
    comment: string;
    reviewImage?: string;
    recommend: number;
}