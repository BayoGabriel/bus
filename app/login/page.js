import LoginForm from './LoginForm';

export const metadata = {
  title: 'Sign In | BusGo',
  description: 'Sign in to your BusGo account to manage your bookings and access personalized features.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <LoginForm />
    </div>
  );
}
