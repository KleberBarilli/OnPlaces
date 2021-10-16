import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

function Dashboard() {

  const { signOut } = useContext(AuthContext)

  return (
	  <div>
		  <h1>USER LOGADOOOOOOO</h1>
		  <button onClick={ () => signOut()}>Logout</button>
	  </div>
  )
}

export default Dashboard;
