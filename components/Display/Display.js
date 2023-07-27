import {useState, useEffect} from 'react';
import ChatDisplay from './Chatbot_display_messages_for_display'
import ButtonGroup from '../buttons/ButtonGroup'
import Description from '../Descriptions/Description';
import Footer from '../Footer/Footer';
import Plan from '../Plan/Plan2';


const TwoColumnLayout = () => {
    const [messagesForDisplay, setMessagesForDisplay] = useState([])
    const [planner, setPlanner] = useState('')
    const [isSum, setIsSum] = useState(false)

    console.log("messagesForDisplay in messagesForDisplay", messagesForDisplay)
  return (
    <div><div
    style={{ border: '1px solid lavendar',}}>

        <Description />
        </div>
 
    <div style={{ display: 'flex', border: '1px solid lightblue', margin: '3px', padding: '5px' }}>
      <div style={{ flex: 3,padding: '5px'  }}>
        <ChatDisplay setMessagesForDisplay={setMessagesForDisplay} setIsSum2={setIsSum} setPlanner={setPlanner}/>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '5px' }}>
    {messagesForDisplay.length > 0 && <ButtonGroup messages={messagesForDisplay} />}

    {planner.length > 3 && <div><br /><Plan planner={planner} isSum={isSum} /></div>}
</div>


    </div>
        <Footer />
    </div>
  );
};

export default TwoColumnLayout;
