

const LandingPage = () => {
  return (
<div className="h-full flex flex-col items-center justify-center pt-[100px]">
  <ul className="flex flex-col items-center space-y-4">
    <li>
      <a href="/login" className="text-blue-500 hover:text-blue-800">Login</a>
    </li>
    <li>
      <a href="/register" className="text-blue-500 hover:text-blue-800">Register</a>
    </li>
  </ul>
</div>


  )
}

export default LandingPage;