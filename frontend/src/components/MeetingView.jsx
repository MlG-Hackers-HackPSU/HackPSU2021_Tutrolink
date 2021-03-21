import { Alert } from 'react-bootstrap'

function MeetingView({ name, taName, taContactLink,session,auth,student,me,setActiveMeeting }) {
    return (
        <Alert variant="info">
            <Alert.Heading>Congratulations,{me.name}, you made  it!</Alert.Heading>
            <p>
                Click <a href={taContactLink} target="_blank" rel="noreferrer">here</a> to meet 
                with {taName} to discuss your question.
            </p>
            <hr />
            <p className="mb-0">
                Be sure to always be respectful of your and the answerer's time!
            </p>
        </Alert>
    )
}

export default MeetingView