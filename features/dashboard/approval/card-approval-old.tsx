// {isFetching ? (
//     <SkeletonApproval />
//   ) : data?.data.length == 0 ? (
//     <div className="flex h-[200px] items-center justify-center">
//       Tidak ada data
//     </div>
//   ) : (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
//       {data?.data.map((val: ApprovalType, index: number) => {
//         const status = {
//           waiting_approval: 'Menunggu',
//           approved: 'Disetujui',
//           rejected: 'Ditolak'
//         };
//         const statusColor = {
//           waiting_approval: 'waiting',
//           approved: 'approved',
//           rejected: 'destructive'
//         };
//         return (
//           <Card key={index} className="overflow-hidden">
//             <div className="relative flex-grow">
//               <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500" />
//             </div>
//             <CardHeader>
//               <CardTitle className="flex justify-between">
//                 #97120398{' '}
//                 <Badge variant={'secondary'}>
//                   {approvalType[val.approval_type]}
//                 </Badge>
//               </CardTitle>
//             </CardHeader>

//             <CardContent>
//               <div className=" grid gap-x-6 text-sm lg:grid-cols-2">
//                 <div className="mb-4 flex items-center space-x-1">
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage
//                       src="https://github.com/shadcn.png"
//                       alt="@shadcn"
//                     />
//                     <AvatarFallback>CN</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <span className="text-xs font-light ">
//                       Nama Karyawan
//                     </span>
//                     <p className="font-medium">{val.user.name}</p>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-xs font-light ">Status</p>
//                   <Badge
//                     variant={
//                       statusColor[
//                         val?.status as keyof typeof statusColor
//                       ] as
//                         | 'approved'
//                         | 'default'
//                         | 'secondary'
//                         | 'destructive'
//                         | 'waiting'
//                         | 'outline'
//                     }
//                   >
//                     {status[val?.status as keyof typeof status]}
//                   </Badge>
//                 </div>
//                 <div className="mb-4">
//                   <p className="text-xs font-light ">Tanggal</p>
//                   <p className="font-medium ">
//                     {moment(val.start_date).format('DD MMMM')} -{' '}
//                     {moment(val.end_date).format('DD MMMM')}
//                   </p>
//                 </div>
//                 <div className="">
//                   <p className="text-xs font-light ">Dokumen Pendukung</p>
//                   {val.supporting_document ? (
//                     <div className="flex items-center text-sm font-medium text-blue-500">
//                       <IconFile className="h-3" />
//                       <span>document.jpg</span>
//                     </div>
//                   ) : (
//                     '-'
//                   )}
//                 </div>
//               </div>
//               <div className="">
//                 <p className="text-xs font-light ">Deskripsi</p>
//                 {val.description ? (
//                   <p className="text-sm ">{val.description} </p>
//                 ) : (
//                   '-'
//                 )}
//               </div>
//             </CardContent>
//             <CardFooter className="flex w-full gap-x-4">
//               <Button
//                 className="w-full"
//                 onClick={() => {
//                   setSelectData(val);
//                   handleOpenCloseDialog('approval');
//                 }}
//               >
//                 {val.status == 'waiting_approval' ? (
//                   <>
//                     {' '}
//                     <IconFeedback className=" mr-[4px] h-4" />
//                     Beri Tanggapan
//                   </>
//                 ) : (
//                   <>
//                     {' '}
//                     <Eye className=" mr-[4px] h-4" />
//                     Lihat Detail
//                   </>
//                 )}
//               </Button>
//             </CardFooter>
//           </Card>
//         );
//       })}
//     </div>
//   )}
