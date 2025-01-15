
// export const SkeletonLoading = () => {
//     return (
//         <div className="flex flex-col min-h-screen items-center justify-center">
//             <div className="flex items-center justify-center space-x-2">
//                 <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                 <span className="text-gray-500 text-lg">Loading...</span>
//             </div>
//         </div>
//     );
// };


export const SkeletonLoading = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-white">
            <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-white text-lg">Loading...</span>
            </div>
        </div>
    );
};
