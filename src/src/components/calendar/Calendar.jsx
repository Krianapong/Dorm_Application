import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './calendar.css';
import { firestore } from '../../firebase';
import ReactModal from 'react-modal';
import Heading from "../common/Heading";

const localizer = momentLocalizer(moment);

const Calendars = () => {
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [event, setEvent] = useState([]);

    const handleEventModalOpen = (event) => {
        setSelectedEvent(event);
        setShowEventModal(true);
    };

    const handleFetchData = () => {
        try {
            const collRef = firestore
                .collection('Apartment')
                .doc('Event')
                .collection('EventData');

            collRef.onSnapshot((querySnap) => {
                const newEvent = querySnap.docs.map((doc) => ({
                    id: doc.id,
                    title: doc.data().title,
                    text: doc.data().text,
                    startTimeEvent: new Date(doc.data().startTimeEvent),
                    endTimeEvent: new Date(doc.data().endTimeEvent),
                }));
                setEvent(newEvent);
            });
        } catch (error) {
            console.log('Error fetch data: ', error);
        }
    };

    useEffect(() => {
        handleFetchData();
    }, []);

    const handleModalClose = () => {
        setShowEventModal(false);
    };

    return (
        <>
            <section className='recent padding'>
                <div className='container' 
                style={{
                    display: 'flex',
                    width: '1200px',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '52px',
                }}>
                    <Heading
                        title="Calendar"
                        subtitle="It is a long established fact that a reader will be distracted by the of readable content of a page when looking at its layouts the points of using."
                    />
                    <Calendar
                        localizer={localizer}
                        events={event}
                        startAccessor="startTimeEvent"
                        endAccessor="endTimeEvent"
                        onSelectEvent={handleEventModalOpen}
                        selectable={true}
                        className="calender-main"
                    />
                </div>
            </section>
            <ReactModal
                isOpen={showEventModal}
                onRequestClose={handleModalClose}
                contentLabel="Example Modal"
                className="custom-modal"
                style={{
                    overlay: {
                        zIndex: 1000,
                    },
                    content: {
                        zIndex: 1001,
                    },
                }}
            >
                <div className="modal-header">
                    <h2>กิจกรรม</h2>
                </div>
                <div className="modal-body">
                    <div className="event-detail">
                        <p><strong>หัวข้อ:</strong> {selectedEvent.title}</p>
                        <p><strong>รายละเอียด:</strong> {selectedEvent.text}</p>
                        <p>
                            <strong>เริ่มวันที่:</strong>{' '}
                            {moment(selectedEvent.startTimeEvent).format('Do MMM YYYY, HH:mm น.')}
                        </p>
                        <p>
                            <strong>จบวันที่:</strong>{' '}
                            {moment(selectedEvent.endTimeEvent).format('Do MMM YYYY, HH:mm น.')}
                        </p>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        onClick={handleModalClose}
                        className="close-button"
                    >
                        Close
                    </button>
                </div>
            </ReactModal>
        </>
    );
};

export default Calendars;
