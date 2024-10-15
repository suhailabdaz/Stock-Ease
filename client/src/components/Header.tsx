import { useSelector } from 'react-redux'
import NoirLogo from './NoirLogo'
import { RootState } from '../stores/store';


const Header = () => {

  const userName = useSelector((state: RootState) => state.userSlice.userData?.name); 
  return (
    <div className='flex justify-between bg-AABlack py-3 px-10 w-[100%] h-auto'>
      <NoirLogo/>
      <div className=' bg-grayButtonColour font-shopify text-fafawhite rounded-xl flex justify-center items-center'>
          <h2 className='px-6 py-1'>
            {userName}
          </h2>
          <div className='px-2 py-1 bg-[#7FE566] font-shopify text-AABlack rounded-lg flex justify-center items-center'>
            {userName?userName[0]:''}
</div>
      </div>
    </div>
  )
}

export default Header