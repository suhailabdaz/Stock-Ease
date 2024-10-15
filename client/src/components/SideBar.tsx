import { ArrowRightStartOnRectangleIcon, ClipboardDocumentCheckIcon, UserGroupIcon, HomeIcon, WalletIcon,ChartBarSquareIcon } from '@heroicons/react/24/outline';
import  { useState } from 'react'
import { useLogOutMutation } from '../features/auth_feature/api/auth-api';
import { useNavigate } from 'react-router-dom';


const SideBar = () => {

  const [currentOption, setCurrentOption] = useState<string>('home');
  const [loginMutation] = useLogOutMutation()
  const navigate = useNavigate()
  const handleLogout = async ()=>{
    try{
      loginMutation({}).unwrap()
    }catch{

    }
  }
  return (
    <div className='h-[91vh]  w-auto pl-6 pr-6 font-shopify bg-sidebarWhite'>
          <nav className=" flex justify-center text-greyText mt-6 text-sm font-semibold">
          <ul className="space-y-4 ">
            <div
              className={`flex rounded-xl p-2 pr-[6rem] ${
                currentOption === 'home'
                  ? 'bg-fafawhite    '
                  : ' bg-transparent '
              }`}
              onClick={()=>{setCurrentOption('home')
                navigate('/home')}
              }
            >
              <li className="flex hover:cursor-pointer">
                <HomeIcon className="h-6 mr-4" />
                <button>
                  Home
                </button>
              </li>
            </div>
            <div
              className={`flex rounded-xl p-2 pr-[6rem]  ${
                currentOption === 'orders'
                  ? 'bg-fafawhite    '
                  : ' bg-transparent '
              }`}
              onClick={()=>{setCurrentOption('orders')
                navigate('/orders')}
              }

            >
              <li className="flex hover:cursor-pointer">
                <WalletIcon className="h-6 mr-4" />
                <button>
                  Orders
                </button>
              </li>
            </div>
            <div
              className={`flex rounded-xl p-2 pr-[6rem]  ${
                currentOption === 'products'
                  ? 'bg-fafawhite    '
                  : ' bg-transparent '
              }`}
              onClick={()=>{setCurrentOption('products')
                navigate('/products')

              }}

            >
              <li className="flex hover:cursor-pointer">
                <ClipboardDocumentCheckIcon className="h-6 mr-4" />
                <button>
                  Products
                </button>
              </li>
            </div>
            <div
              className={`flex rounded-xl p-2 pr-[6rem] ${
                currentOption === 'customers'
                  ? 'bg-fafawhite    '
                  : ' bg-transparent '
              }`}
              onClick={()=>{setCurrentOption('customers')
                navigate('/customers')

              }}

            >
              <li className="flex hover:cursor-pointer">
                <UserGroupIcon className="h-6 mr-4" />
                <button>
                  Customers
                </button>
              </li>
            </div>
            <div
              className={`flex rounded-xl p-2 pr-[6rem]  ${
                currentOption === 'analytics'
                  ? 'bg-fafawhite    '
                  : ' bg-transparent '
              }`}
              onClick={()=>{setCurrentOption('analytics')
                navigate('/analytics')
              }}

            >
              <li className="flex hover:cursor-pointer">
                <ChartBarSquareIcon className="h-6 mr-4" />
                <button>
                  Analytics
                </button>
              </li>
            </div>
            <div
              className={`flex rounded-xl p-2 pr-[6rem] py-8 font-extrabold ${
                currentOption === 'login'
                  ? 'bg-fafawhite    '
                  : ' bg-transparent '
              }`}

            >
            <li className="flex hover:cursor-pointer">
              <ArrowRightStartOnRectangleIcon className="h-6 mr-4" />
              <button
                className=" font-bold  "
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </li>
            </div>
          </ul>
        </nav>
    </div>
  )
}

export default SideBar