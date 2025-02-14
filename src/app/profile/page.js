import { Card, CardBody } from "@heroui/react";
import ProfileNavbar from "../components/Profile/Navbar";

const Profile = () => {
  return (
    <>
      <div className="grid grid-cols-[200px_minmax(700px,_1fr)_100px] mt-5 mb-10">
        <ProfileNavbar />
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 shadow-xl bg-white p-10 rounded-l-3xl">
          <Card className="h-[150px]">
            <CardBody>
              <div className="flex flex-col items-start gap-2">
                <div className="flex flex-row">
                  <p className="text-xl">10</p>
                  <p className="text-xl">سفارش</p>
                </div>
                <p>در انتظار پرداخت</p>
              </div>
            </CardBody>
          </Card>
          <Card className="h-[150px]">
            <CardBody>
              <div className="flex flex-col items-start gap-2">
                <div className="flex flex-row">
                  <p className="text-xl">10</p>
                  <p className="text-xl">سفارش</p>
                </div>
                <p>در حال پردازش</p>
              </div>
            </CardBody>
          </Card>
          <Card className="h-[150px]">
            <CardBody>
              <div className="flex flex-col items-start gap-2">
                <div className="flex flex-row">
                  <p className="text-xl">10</p>
                  <p className="text-xl">سفارش</p>
                </div>
                <p>ارسال شده</p>
              </div>
            </CardBody>
          </Card>
          <Card className="h-[150px]">
            <CardBody>
              <div className="flex flex-col items-start gap-2">
                <div className="flex flex-row">
                  <p className="text-xl">10</p>
                  <p className="text-xl">سفارش</p>
                </div>
                <p>لغو شده</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};
export default Profile;
