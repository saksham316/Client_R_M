export function HeaderNonAuthenticatedScreen() {
  return (
    <div className="relative w-full background-header">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center justify-center ">
          {/* <img
            src="https://www.shutterstock.com/image-vector/crm-letter-logo-design-on-600nw-2206999995.jpg"
            height={100}
            width={100}
            alt="CRM LOGO"
          /> */}
          <span className="font-bold text-6xl text-center text-[darkblue] mt-5 non-login-header">
            C.R.M ADMIN
          </span>
        </div>
      </div>
    </div>
  );
}
