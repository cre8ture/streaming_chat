// import Chatbot from '../components/Chatbot'
import Chatbot from '../components/Chatbot4_types_code'


export default function Index() {
  return (
    <div>
      <p>
      To test the CORS route, open the console in a new tab on a different
      domain and make a POST / GET / OPTIONS request to <b>/api/cors</b>. Using
      a different method from those mentioned will be blocked by CORS
    </p>
    <Chatbot />
    </div>
  )
}
