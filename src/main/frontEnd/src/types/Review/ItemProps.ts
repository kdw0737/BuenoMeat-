export interface ReviewItemProps {
    comment: string;
    reviewId: number;
    itemId: number;
    itemImage: string;
    itemName: string;
    reviewImage?: string;
    reviewTime: string;
    starRating: number;
}