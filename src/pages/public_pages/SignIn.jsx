import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

const SignIn = () => {
  const navigate = useNavigate();
  const [searchParams, setSetSearchParams] = useSearchParams();

  const [message, setMessage] = useState({ title: "", description: "" });
  const [error, setError] = useState({ title: "", description: "" });
  const [user, setUser] = useState({ email: '', password: ''});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLaoding] = useState(false);

  const clearInputs = () => {
    setUser({ email: '', password: '' });
    setMessage({ title: "", description: "" });
    setError({ title: "", description: ""});
  }

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const signIn = (e) => {
    e.preventDefault();

    setError({ title: "", description:""});
    
    axios.post(`${serverAddress}/api/v1/cement-swift/auth/signin`, user)
    .then((response) => {
      if (response.status === 200) {

          setMessage({
            title: "Success",
            description: response.data.message
          });

          localStorage.setItem('user', JSON.stringify(response.data.user ));

          clearInputs();

          setTimeout(() => {
            if (searchParams.get("redirect")) {
              navigate(`/${searchParams.get("redirect")}`);
            } else {
              navigate('/');
            }
          }, 3000);
        }
      })
      .catch(error => {
        setError({
          title: 'Error',
          description: error.message
        })
      })
  }

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Night"
            src="http://localhost:3000/images/1.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="/">
              <span className="sr-only">Home</span>
              <img src="http://localhost:3000/images/favicon.png" width={80} alt="" />
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">Welcome to Cement Swift</h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
              quibusdam aperiam voluptatum.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <Link className="inline-flex h-16 w-16 items-center justify-center rounded-md bg-white text-blue-600 sm:h-20 sm:w-20" to="/">
                <span className="sr-only">Home</span>
                <img src="http://localhost:3000/images/favicon.png" width={80} alt="" />
              </Link>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Cement Swift
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                quibusdam aperiam voluptatum.
              </p>
            </div>

            <form onSubmit={signIn} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                {/* Success alert */}
                {message.title && <SuccessAlert message={message} />}

                {/* Error alert  */}
                {error.title && <ErrorAlert error={error} />}
              </div>

              <div className="col-span-6 mb-5">
                <h1 className="w-full font-bold text-4xl">Sign In</h1>
              </div>

              <div className="col-span-6">
                <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>
                <input
                  type="email"
                  id="Email"
                  name="email"
                  value={user.email || ''}
                  onChange={handleInputs}
                  className="mt-1 w-full p-3 rounded-md border border-slate-900 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>
                <input
                  type={showPassword ? "text" :"password"}
                  id="Password"
                  name="password"
                  value={user.password || ''}
                  onChange={handleInputs}
                  className="mt-1 w-full p-3 rounded-md border border-slate-900 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <input
                  type="checkbox"
                  id="showPassword"
                  name="showPassword"
                  onChange={()=> setShowPassword(current => !current)}
                  className="p-3 rounded"
                />
                <label htmlFor="showPassword" className="ml-4 text-sm font-medium text-gray-700">Show Password</label>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button type="submit" className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                  Sign in
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Does not have an account?
                  {searchParams.get("redirect") ?
                    <a href={`/signup?redirect=${searchParams.get("redirect")}`} className="text-gray-700 underline">Create account</a>
                    :
                    <a href="/signup" className="text-gray-700 underline">Create account</a>
                  }.
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  )
}

export default SignIn