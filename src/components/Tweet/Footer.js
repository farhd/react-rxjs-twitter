import { FaThumbsUp } from 'react-icons/fa'

function TweetFooter({ onLiked = () => {}, isLiked = false }) {
  return (
    <div className="TweetFooter mt-2">
      <button onClick={onLiked} title="like" className="px-2 py-1">
        <FaThumbsUp
          className="text-blue-400"
          style={{ strokeWidth: '30px', fill: !isLiked && '#fff' }}
        />
      </button>
    </div>
  )
}

export default TweetFooter
