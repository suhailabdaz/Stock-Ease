import { useLogOutMutation } from '../../features/auth_feature/api/auth-api'
import { toast } from 'sonner'


const HomePage = () => {

const [logoutMutation] = useLogOutMutation()

const onSubmit = async (
 
) => {
  try {
   const response = logoutMutation({}).unwrap()
   console.log(response);
   
  } catch {
    toast.error('Something went wrong');
  } finally {
  }
};


  return (
    <div><button onClick={()=>{onSubmit()}}>logout</button></div>
  )
}

export default HomePage