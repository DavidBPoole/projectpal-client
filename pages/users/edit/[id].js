// UserForm Redirected to index.js to be used in a direct modal on page.
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getSingleUser } from '../../../utils/data/UserData';
// import UserForm from '../../../components/UserForm';

// export default function EditUser() {
//   const [editUser, setEditUser] = useState({});
//   const router = useRouter();

//   const { id } = router.query;

//   useEffect(() => {
//     getSingleUser(id).then(setEditUser);
//   }, [id]);

//   return (
//     <>
//       <UserForm userObj={editUser} />
//     </>
//   );
// }
