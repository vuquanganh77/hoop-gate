interface ProductReviewProps {
    createdAt: string;
    rating: number;
    user: string;
    content: string;
}

export function ProductReview({ createdAt, rating, user, content }: ProductReviewProps) {
    const totalStars = 5;

    return (
        <div className="flex flex-col gap-3 py-6">
            <div className="flex justify-between">
                <span className="flex gap-1 mr-5">
                    {Array.from({ length: totalStars }, (_, index) => (
                        <span
                            key={index}
                            className={`text-2xl ${
                                index < rating ? "text-yellow-500" : "text-gray-400"
                            }`}
                        >
                            ★
                        </span>
                    ))}
                </span>
                <span className="text-gray-500">{user} - {createdAt}</span>
            </div>
            <div>{content}</div>
        </div>
    );
}
