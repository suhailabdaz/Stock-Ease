import { Toaster } from 'sonner';

const LoginPage = () => {
  return (
    <div className="w-full md:flex justify-between h-screen">
      <Toaster position="bottom-right" expand={false} richColors />
    </div>
  );
};

export default LoginPage;
