import { Alert, Button } from 'react-bootstrap'
import client from '../client/client'

function MeetingView({ session, student, activeMeeting, setQueue }) {

    const leaveMeeting = () => {
        client.leaveMeet(session, activeMeeting.Student.student_id, activeMeeting.Tutor.ID)
            .then(queue => setQueue(queue))
    }

    if (student && activeMeeting) {
        return (
            <Alert variant="info">
                <Alert.Heading>Congratulations, {activeMeeting.Student.name}, you made it!</Alert.Heading>
                <p>
                    Click <a href={activeMeeting.Tutor.contact_link} target="_blank" rel="noreferrer">here</a> to meet 
                    with {activeMeeting.Tutor.Name} to discuss your question.
                </p>
                <hr />
                <p className="mb-0">
                    Be sure to always be respectful of your and the answerer's time!
                </p>
            </Alert>
        )
    } else if (!student && !activeMeeting) {
        return (
            <Alert variant="secondary">
                <Alert.Heading>Currently not meeting with a student.</Alert.Heading>
                <p>
                    Click one of the students in the queue below to meet with them. They'll
                    get access to your contact link.
                </p>
                <hr />
                <p className="mb-0">
                    Be sure to always be respectful of your and the answerer's time!
                </p>
            </Alert>   
        )
    } else {
        return (
            <Alert variant="success">
                <Alert.Heading>You are in a meeting with {activeMeeting.Student.name}</Alert.Heading>
                <p>
                    They've been given your contact link and should be reaching out shortly.
                </p>
                <hr />
                <p className="mb-0">
                    Be sure to always be respectful of your and the answerer's time!
                </p>
                <p style={{ marginTop: '1vh' }}>
                    <Button variant="danger" onClick={leaveMeeting}>Leave Meeting</Button>
                </p>
                
            </Alert>   
        )
    }


}

export default MeetingView