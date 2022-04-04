import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService} from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser !== null);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
      authService.onAuthStateChanged((user) =>{
        setInit(false);
        if(user){
          setIsLoggedIn(true);
          setUserObj({
            displayName : user.displayName,
            uid : user.uid,
            updateProfile : (args) => user.updateProfile(args),
          });
        }
        else{
          setIsLoggedIn(false);
          setUserObj(null);
        }
        setInit(true);
      })
  }, []);

  const refreshUser = () =>{
    const user = authService.currentUser;

    setUserObj({
            displayName : user.displayName,
            uid : user.uid,
            updateProfile : (args) => user.updateProfile(args),
          });
  }

  return (
    <div>
      {init? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj}/> : "초기화중"}
    </div>
  );
}

export default App;
