import { useAuth } from '../hooks/useAuth';



export default function Dashboard() {

    const { user } = useAuth();
    const { signOut } = useAuth();

    const handleSignOut = () => {
        signOut();
    };

  return(
    <div>
        <h1>ola {user?.uid}</h1>
        <p>Bem-vindo ao Dashboard!</p>
        <button onClick={handleSignOut}>Sair</button>
    </div>
    
  )
   
        
}