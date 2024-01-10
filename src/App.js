import AuthContextProvider from "./components/AuthContext";
import AppRouter from "./router/AppRouter";

/**
* @description The `App` function is a functional component that wraps the
* `AuthContextProvider` and `AppRouter` components.
* 
* @returns {  } The `App` function returns a React component that wraps an
* `<AuthContextProvider>` component and an `<AppRouter>` component.
*/
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

