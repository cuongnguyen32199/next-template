function Login() {
  return (
    <div className="container-fluid h-100vh bg-indigo-200">
      <div className="flex justify-center items-center h-100">
        <div className="login">
          <div className="login__head font-bold text-gray-700 text-center size-20">Login</div>
          <div className="login__body">
            <div className="form-control">
              <span className="text-gray-700 font-bold block mb-1">Email</span>
              <input type="email" className="form-input text-gray-700 text-sm bg-gray-100 border-transparent px-4 py-3 rounded-md w-full mb-3 focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="example@gmail.com" />
            </div>
            <div className="form-control">
              <span className="text-gray-700 font-bold block mb-1">Password</span>
              <input type="password" placeholder="********" className="form-input text-gray-700 text-sm border-transparent bg-gray-100 px-4 py-3 rounded-md w-full mb-3 focus:border-gray-500 focus:bg-white focus:ring-0" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white uppercase font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
            <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 uppercase hover:text-blue-800">Forgot Password</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
