interface StarRatingProps {
    rating: number;
    onRatingChange: (rating: number) => void;
}

const StarRating = ({ rating, onRatingChange }: StarRatingProps) => {
    return (
        <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, index) => (
                <span
                    key={index}
                    className={`cursor-pointer text-3xl ${
                        index < rating ? "text-yellow-500" : "text-gray-400"
                    }`}
                    onClick={() => onRatingChange(index + 1)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
