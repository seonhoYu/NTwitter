import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService} from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser !== null);
  useEffect(() => {
      authService.onAuthStateChanged((user) =>{
        setInit(false);
        if(user){
          setIsLoggedIn(true);
        }
        else{
          setIsLoggedIn(false);
        }
        setInit(true);
      })
  }, []);

  return (
    <div>
      {init? <AppRouter isLoggedIn={isLoggedIn}/> : "초기화중"}
      <footer>
        &copy;
      </footer>
    </div>
  );
}

export default App;
