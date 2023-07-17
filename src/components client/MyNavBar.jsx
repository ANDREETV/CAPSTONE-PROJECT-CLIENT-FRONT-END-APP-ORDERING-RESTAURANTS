import { Avatar, Navbar, Typography } from '@material-tailwind/react';

export default function MyNavBar() {
  return (
    <>
      <Navbar className="sticky navHome top-0 z-10 h-max max-w-full rounded-none border-transparent py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center  text-blue-gray-900">
          <Avatar
            src={require('../image/logoapp.png')}
            alt="avatar"
            size="xl"
            className="me-4"
          />
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-medium md:text-3xl"
          >
            Handre Restaurant
          </Typography>
        </div>
      </Navbar>
    </>
  );
}
