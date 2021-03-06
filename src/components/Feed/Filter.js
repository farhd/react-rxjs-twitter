import { Actions } from '../../store'
import { filters } from '../../common/const'

function FeedFilter({ filter = filters.ALL }) {
  return (
    <div className="FeedFilter mx-4">
      <span>Filter: </span>
      <button
        className={`border rounded-tl rounded-bl px-2 ${
          filter === filters.ALL ? 'bg-blue-200' : ''
        }`}
        onClick={() => Actions.updateFilter(filters.ALL)}
      >
        all
      </button>
      <button
        className={`border border-l-0 rounded-tr rounded-br px-2 ${
          filter === filters.LIKED ? 'bg-blue-200' : ''
        }`}
        onClick={() => Actions.updateFilter(filters.LIKED)}
      >
        liked
      </button>
    </div>
  )
}

export default FeedFilter
