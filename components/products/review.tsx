import { Star, StarOff } from 'lucide-react';

interface ProductReviewProps {
    createdAt: string,
    rating: number,
    user: string,
    content: string
}

export function ProductReview({ createdAt, rating, user, content }: ProductReviewProps) {

    const roundedRating = Math.round(rating);
    const totalStars = 5;

    return (
        <div className="flex flex-col gap-3 py-6">
            <div className="flex justify-between">
                <span className='flex'>
                    {Array.from({ length: roundedRating }).map((_, index) => (
                        <Star key={index} color="black" size={24} />
                    ))}
                    {Array.from({ length: totalStars - roundedRating }).map((_, index) => (
                        <StarOff key={index} color="gray" size={24} />
                    ))}
                </span>
                <span className='text-gray-500'>{user} - {createdAt}</span>
            </div>
            <div>{content}</div>
        </div>
    )
}