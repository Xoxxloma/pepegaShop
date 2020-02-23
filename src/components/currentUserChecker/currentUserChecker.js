import { CurrentUserContext } from "../../context/currentUser"
import { useContext, useEffect } from "react"


const CurrentUserChecker = ({children}) => {
  const token = localStorage.getItem('token')
  // const [token] = useLocalStorage('token')
  const [, dispatch] = useContext(CurrentUserContext)
  
  useEffect(() => {
    if (!token) {
      dispatch({ type: 'SET_UNAUTHORIZED'})
      return
    }
    dispatch({
      type: 'SET_AUTHORIZED',
      payload: token
    })
  }, [token, dispatch])

  return children
}
export default CurrentUserChecker