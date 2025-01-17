import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="post-card p-4 shadow-md rounded-md bg-white">
      <div className="post-profile flex items-center gap-4 mb-4">
        <img 
          src={post.author.avatar} 
          alt={post.author.name} 
          className="post-avatar w-16 h-16 rounded-full object-cover"
        />
        <div className="post-details">
            <h5 className="text-lg font-semibold">{post.author.name}</h5>
            <p className="text-sm text-gray-500">{post.author.job}</p>
        </div>
      </div>
      <div className="post-content mb-4">
        <div>
            <img 
              src={post.image} 
              alt={post.title} 
              className="post-image w-full rounded-md object-cover"
            />
        </div>
      </div>
        <div className="post-buttons flex justify-between gap-4">
            <div 
              className="btn-primary w-full py-2 text-center cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >S'inscrire en ligne</div>
            <div 
              className="btn-primary w-full py-2 text-center cursor-pointer bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >S'inscrire en présentiel</div>
        </div>
    </div>
  );
};

export default PostCard;