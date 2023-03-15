import AuthContextProvider from "./components/AuthContext";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </>
  );
}

export default App;
