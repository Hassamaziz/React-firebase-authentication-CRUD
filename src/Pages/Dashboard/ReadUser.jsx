import React, { useState,useEffect } from 'react'
import { collection, getDocs,setDoc,doc,deleteDoc,onSnapshot,updateDoc } from "firebase/firestore"; 
import { firestore } from '../../Config/Firebase';
import { showToast } from '../../Config/Global';



const ReadUser = () => {
  const [users, setUsers] = useState([]);
  const [userForedit,setUserForedit] =useState({})
  const [search,setSearch]=useState('')
  const [sortByAgeAsc, setSortByAgeAsc] = useState(true);
  

  const handleChange = (e) => {
    setUserForedit({ ...userForedit, [e.target.name]: e.target.value });
  };
  
  const fetchUsers = async () => {
    let array = [];
    
    const querySnapshot = await getDocs(collection(firestore, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      array.push(doc.data())
    });
    setUsers(array);
    
  }
     
  useEffect(()=>{
    
    const unsubscribe  =  onSnapshot(collection(firestore, "users"), (snapshot) => {
       const updatedUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(updatedUsers);
    });
    fetchUsers();
    
    return () => unsubscribe();
  }, []);
    
  const handleEdit=(user)=>{
    console.log(user);
    setUserForedit(user);

  }
  


  const handleUpdate=async (user)=>{
    console.log('update');
    

   let name = user.name.trim();
   let country = user.country.trim();
    let age = Number(user.age);
    

    if (name.length < 4) {
      showToast(`Name length is short`, "error");
      return;
    }
    if (country.length < 2) {
      showToast(`Enter Correct Country`, "error");
      return;
    }
    if (!age || age < 0) {
      showToast(`Invalid Age Entered`, "error");
      return;
    }
    let newUsers = users.map((oldUser) => {
      if (oldUser.usersId === user.usersId) {
        return user;
      } else {
        return oldUser;
      }
      });
      try {
      await updateDoc(doc(firestore, "users", user.usersId), user );
      console.log("Document updated with ID: ", user.usersId);
      showToast(
        `Document updated with ID: ${user.usersId}`,
        "success"
      );
      setUsers(newUsers);
    } catch (e) {
      console.error("Error adding document: ", e);
      showToast(`Error adding document: ${e.message}`, "error");
    }
    setUserForedit({});
  };

  

  const handleDelete =async (user)=>{
    console.log("document deleted");
    console.log("user : ", user, " users : ", users);

    let newUsers = users.filter((newUser) => {
      return user.usersId !== newUser.usersId;
    });
      console.log(newUsers,"new Users")
    try {
      await deleteDoc(doc(firestore, 'users', user.usersId));
      showToast("User Deleted Successfully","success")
      setUsers(newUsers)
    } catch (error) {
      showToast("delete failed","error")
    }
  };
 
  const toggleSortByAge = () => {
    setSortByAgeAsc(!sortByAgeAsc);
  };  

  
  
  return (
    
    <>
    <main className='bg'>
        <div className="py-5 w-100">
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 className="text-white text-center">Users</h1>
                <hr />
                <form >
                <input
                type="text"
                className="form-control"
                onChange={(e)=>setSearch(e.target.value)}
                autoComplete='false'
                placeholder="Enter Name For Search"
                name="name"
              />
                </form>
                <br />
                {users.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-light table-striped">
                    <thead>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>Name</th>
                      <th scope='col'>
                        Age{' '}
                        <button
                          className='btn btn-link'
                          onClick={toggleSortByAge}
                        >
                          {/* Toggle sorting order button */}
                          {sortByAgeAsc ? '▲' : '▼'}
                        </button>
                      </th>
                      <th scope='col'>Country</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      .filter((user) => {
                        return (
                          search.toLowerCase() === '' ||
                          user.name.toLowerCase().includes(search)
                        );
                      })
                      .sort((a, b) => {
                        // Sort by age based on sorting order
                        return sortByAgeAsc
                          ? a.age - b.age
                          : b.age - a.age;
                      })
                      .map((user, i) => {
                        return (
                            <tr key={i}>
                              <th scope="row">{i + 1}</th>
                              <td>{user.name}</td>
                              <td>{user.age}</td>
                              <td>{user.country}</td>
                              <td>
                                <button
                                  className="btn btn-sm btn-info me-2"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editModal"
                                  onClick={() => {
                                    handleEdit(user);
                                  }}
                                >
                                  Update
                                </button>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => {
                                    handleDelete(user);
                                  }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="spinner-border text-white"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="editModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit User
                
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    required
                    value={userForedit.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Country"
                    name="country"
                    required
                    value={userForedit.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Age"
                    name="age"
                    required
                    value={userForedit.age}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  handleUpdate(userForedit);
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default ReadUser