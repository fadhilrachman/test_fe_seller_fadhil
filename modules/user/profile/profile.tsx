import Navbar from '@/components/shared/navbar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Profile() {
  const data = [
    {
      label: 'Username',
      value: 'Fadhil Rahman'
    },
    {
      label: 'Password',
      value: 'Admin123'
    },
    {
      label: 'Role',
      value: 'User'
    }
  ];
  return (
    <div className="">
      <Navbar />

      <div className=" flex min-h-[75vh] items-center justify-center pt-[100px] md:pt-[150px]">
        <Card className="mx-auto w-full max-w-md border-none border-none shadow-none">
          <CardHeader className="text-center">
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <Avatar className="h-16 w-16 bg-blue-200">
                <AvatarFallback className="text-xl text-blue-600">
                  J
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-3">
              {data.map((val, key) => {
                return (
                  <div
                    key={key}
                    className="flex rounded-md bg-gray-100 px-3 py-2"
                  >
                    <div className="flex ">
                      <p className="w-[100px] font-semibold text-gray-900 ">
                        {val?.label}
                      </p>
                      <span>:</span>
                    </div>
                    <p className="w-full text-center">{val.value}</p>
                  </div>
                );
              })}
            </div>

            <Button className="w-full ">Back to home</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
