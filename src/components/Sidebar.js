import { FaTwitter, FaHome } from 'react-icons/fa'

function Sidebar() {
  return (
    <div className="Sidebar lg:w-40">
      <div className="w-12 h-12 p-2 mb-3">
        <FaTwitter
          title="Twitter"
          className="w-full h-full fill-current"
          style={{ color: 'rgba(29,161,242,1.00)' }}
        />
      </div>
      <div className="h-12 p-2 flex justify-items-start">
        <div className="w-8 mr-3">
          <FaHome
            className="w-full h-full fill-current"
            // style={{ color: 'rgba(29,161,242,1.00)' }}
          />
        </div>
        <span className="items-center font-bold hidden lg:flex">Home</span>
      </div>
    </div>
  )
}

export default Sidebar
