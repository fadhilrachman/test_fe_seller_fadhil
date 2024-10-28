import React from 'react';

function TabDivisionInformation(data: any) {
  console.log(data);
  const dataDetail = [
    {
      key: 'Code',
      value: data?.data?.code
    },
    {
      key: 'Nama Divisi',
      value: data?.data?.name
    },
    {
      key: 'Lokasi',
      value: data?.data?.location
    },
    {
      key: 'Jam Masuk',
      value: data?.data?.entry_time
    },
    {
      key: 'Jam Keluar',
      value: data?.data?.leave_time
    }
  ];

  const location = data?.data?.location?.split(',');
  const latitude = location?.[0];
  const longitude = location?.[1];

  return (
    <div className="space-y-2 rounded-md border p-4">
      <h3 className="text-xl font-bold tracking-tight">Division Information</h3>
      <div>
        {dataDetail.map((item, index) => (
          <div key={index} className="flex border-y py-2">
            <p className="min-w-[400px]">{item.key}</p>
            <div className={`${item.key === 'Code' ? 'text-blue-500' : ''}`}>
              <p>{item.value}</p>
              {item.key === 'Lokasi' && latitude && longitude && (
                <div className="mt-4 overflow-hidden rounded-md border">
                  <iframe
                    src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`}
                    // className="h-[300px] w-[500px]"
                    loading="lazy"
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TabDivisionInformation;
