import React from 'react';

const DataInformation = ({ dataDetail }: { dataDetail: any[] }) => {
  return (
    <div className="">
      {dataDetail.map((val, index) => {
        return (
          <div className="flex border-b py-2" key={index}>
            <p className="min-w-[250px]">{val.key}</p>
            <p>: {val.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DataInformation;
