'use client';
import ProfileSkeleton from '@/components/shared/profile-skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetProfile } from '@/hooks/profile.hook';
import { useRouter } from 'next/navigation';

export default function ProfileAdmin() {
  const router = useRouter();
  const { data, isFetching } = useGetProfile();

  const dataProfile = [
    {
      label: 'Username',
      value: data?.result?.user_name
    },
    {
      label: 'Password',
      value: data?.result?.password
    },
    {
      label: 'Role',
      value: data?.result?.role
    }
  ];
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      {isFetching ? (
        <ProfileSkeleton />
      ) : (
        <Card className="mx-auto w-full max-w-md  border-none border-none shadow-none">
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
              {dataProfile.map((val, key) => {
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

            <Button
              className="w-full "
              onClick={() => {
                router.push('/admin/article');
              }}
            >
              Back to dashboard
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
