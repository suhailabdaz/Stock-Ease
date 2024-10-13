import logo from '../assets/images/envato (4).png'

const Logo = () => {
  return (
    <div className='flex p-2 justify-start items-center space-x-2 font-light font-dunk500 text-gray-800 text-2xl'>
      <img src={logo} alt="s" className='w-7 h-7' />
      <h2>Stock-Ease</h2>
    </div>
  )
}

export default Logo